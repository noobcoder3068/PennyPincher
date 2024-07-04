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
            console.log("Stored hashed password:", storedHashedPassword);
            bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    res.status(500).send("Internal server error");
                } else if (isMatch) {
                    res.send("Password is correct");
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

app.listen(port, () => {
    console.log('Server is live on port', port);
});
