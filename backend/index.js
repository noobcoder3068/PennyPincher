import express from 'express';
import axios from 'axios';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import env from 'dotenv';

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
            // console.log("Stored hashed password:", storedHashedPassword);
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
    const { type, description, amount, category, user_id } = req.body;
    if (!type || !amount) {
        return res.status(400).send("Type or Amount not present");
    } else if (type === "Expense" && !category) {
        return res.status(400).send("Category not present");
    }
    console.log(type, description, amount, category, user_id);
    try {
        const result1 = await db.query('insert into transection_data(user_id, balance, transection_type) values($1, $2, $3)', [user_id, amount, type]);
        console.log("Transaction data inserted successfully:", result1.rows);

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

        
        const result2 = await db.query('insert into details(user_id, category, description, current_balance) values($1, $2, $3, $4)', [user_id, category, description, netBalance]);
        console.log("Details inserted successfully:", result2.rows);

        res.status(201).send("Expense added successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log('Server is live on port', port);
});
