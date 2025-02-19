import express, { text } from 'express';
import axios from 'axios';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import nodemailer from 'nodemailer';
import crypto, { hash } from 'crypto';

const port = 5000;
const app = express();
const saltRounds = 10;
app.use(cors());
app.use(express.json());
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const transporter= nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})

db.connect((err) => {
    if (err) {
        console.error("Could not connect to database:", err);
    } else {
        console.log("Successfully connected to the database");
    }
});

app.get('/', (req, res) => {
    res.send("Hello, we are live!");
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log('Received login request:', password);
    try {
        console.log(`Login attempt with name: ${name}`);
        const result = await db.query("SELECT * FROM users WHERE email = $1 OR username = $2", [name, name]);
        console.log("Query result:", result);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            console.log(user);
            bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    res.status(500).send("Internal server error");
                } else if (isMatch) {
                    res.send({message: "success", user});
                } else {
                    res.send("Incorrect Password");
                }
            });
        } else {
            console.log("User not found with email/username:", name);
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Internal server error");
    }
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).send("Email, username, and password are required");
    }
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (result.rows.length >= 1) {
            res.status(409).send("Email or username already exists");
            console.log("This email or username already exists");
        } else {
            bcrypt.hash(password, saltRounds, async (error, hash) => {
                if (error) {
                    console.error("Error in hashing:", error);
                    res.status(500).send("Internal server error");
                } else {
                    try {
                        const ret = await db.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hash]);
                        console.log(ret);
                        res.status(201).send("Registered");
                    } catch (err) {
                        console.error("Database error:", err);
                        res.status(500).send("Internal server error");
                    }
                }
            });
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Internal server error");
    }
});

app.post('/AddExpense', async (req, res) => {
    const { type, description, amount, category, method, user_id } = req.body;
    if (!type || !amount) {
        return res.status(400).send("Type or Amount not present");
    } else if (type === "Expense" && !category) {
        return res.status(400).send("Category not present");
    }
    console.log(type, description, amount, category, method, user_id);
    try {
        const result1 = await db.query(
            'INSERT INTO transection_data(user_id, balance, transection_type, transection_method) VALUES($1, $2, $3, $4) RETURNING id',
            [user_id, amount, type, method]
        );
        const transection_id = result1.rows[0].id;

        const total= await db.query('select transection_type, SUM(balance) as total_amount from transection_data where user_id= $1 group by transection_type', [user_id]);
        let expenseCost= 0;
        let savingCost= 0;

        total.rows.map(val=>{
            if(val.transection_type === "Expense"){
                expenseCost= val.total_amount;
            }
            else{
                savingCost= val.total_amount;
            }
        })

        const netBalance= savingCost- expenseCost;
        console.log(netBalance);
        
        const result2 = await db.query('insert into details(user_id, category, description, current_balance, transection_id) values($1, $2, $3, $4, $5)', 
            [user_id, category, description, netBalance, transection_id]);
        console.log("Details inserted successfully:", result2.rows);

        res.status(201).send("Expense added successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal server error");
    }
});

app.get('/getAllInfo', async (req, res) => {
    const user_id = parseInt(req.query.user_id, 10);
    console.log('User ID:', user_id);
  
    if (isNaN(user_id)) {
      console.error('Invalid user_id:', req.query.user_id);
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    try {
      const result = await db.query(
        'SELECT t.balance AS balance, t.transection_date AS date, t.transection_method AS method, d.category AS category, d.description AS description FROM transection_data AS t LEFT JOIN details AS d ON t.id = d.transection_id WHERE t.user_id = $1',
        [user_id]
      );
      console.log(result.rows);
      res.json(result.rows);
    } catch (err) {
      console.log('Error in fetching info', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/charts', async (req, res) => {
const user_id = parseInt(req.query.user_id, 10);
console.log('User ID:', user_id);

    try {
        const result = await db.query(`
            WITH transaction_summary AS (
                SELECT transection_type, SUM(balance) AS total_balance 
                FROM transection_data 
                WHERE user_id = $1 
                GROUP BY transection_type
            ),
            saving_by_category AS (
                SELECT d.category, SUM(t.balance) AS total_saving 
                FROM transection_data AS t 
                LEFT JOIN details AS d ON t.id = d.transection_id 
                WHERE t.user_id = $1 AND t.transection_type = 'Saving' 
                GROUP BY d.category
            ),
            expense_by_category AS (
                SELECT d.category, SUM(t.balance) AS total_expense 
                FROM transection_data AS t 
                LEFT JOIN details AS d ON t.id = d.transection_id 
                WHERE t.user_id = $1 AND t.transection_type = 'Expense' 
                GROUP BY d.category
            ),
            balance_by_method AS (
                SELECT transection_method, SUM(balance) AS total_balance 
                FROM transection_data 
                WHERE user_id = $1 
                GROUP BY transection_method
            )
            SELECT 
                (SELECT json_agg(ts) FROM transaction_summary ts) AS transaction_summary,
                (SELECT json_agg(sb) FROM saving_by_category sb) AS saving_by_category,
                (SELECT json_agg(eb) FROM expense_by_category eb) AS expense_by_category,
                (SELECT json_agg(bm) FROM balance_by_method bm) AS balance_by_method;
        `, [user_id]);

        console.log('Chart Data:', result.rows[0]);

        res.json(result.rows[0]);
    } catch (err) {
        console.log('There was an error in fetching chart data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).send("No registration with this email");
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        // const resetTokenExpiry = Date.now() + 3600000;

        await db.query('UPDATE users SET resetToken = $1 WHERE email = $2', [resetToken, email]);

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Reset Password",
            text: `You requested a password reset. Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending email');
            }
            console.log("Password reset email sent");
            res.send('Password reset email sent');
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    const token = req.params.token;

    try {
        const result = await db.query('SELECT * FROM users WHERE resetToken = $1', [token]);

        if (result.rows.length === 0) {
            return res.status(404).send("Invalid token");
        }

        // if (result.rows[0].resetTokenExpiry < Date.now()) {
        //     return res.send("Your reset link has expired, please try again");
        // }

        bcrypt.hash(password, saltRounds, async (error, hash) => {
            if (error) {
                return res.status(406).send("There was an error in hashing the password");
            } else {
                if (hash === result.rows[0].password) {
                    return res.send("This is the same password as before, please set a different password");
                }
                try {
                    await db.query('UPDATE users SET password = $1 WHERE resetToken = $2', [hash, token]);
                    console.log("Password was updated");
                    res.send("Password reset successfully");
                } catch (err) {
                    console.log("Error in database", err);
                    res.status(500).send("There was an error updating the password in the database");
                }
            }
        });
    } catch (err) {
        console.log("There was an error in backend", err);
        res.status(500).send("There was an error processing your request");
    }
});

app.post('/contact', async (req, res) => {
    const mail = req.body;
    try {
        const mailOptions = {
            from: mail.email,
            to: process.env.GMAIL_USER,
            subject: "Message from a PennyPincher user",
            text: `Name: ${mail.user}\nemail: ${mail.email} \nMessage: ${mail.message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending email');
            }
            console.log("Contact form email sent:", info.response);
            res.send('Contact form email sent successfully');
        });
    } catch (err) {
        console.error("There was an error in the contact backend:", err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log('Server is live on port', port);
});