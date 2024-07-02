import express from 'express';
import axios from 'axios';
import cors from'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import env from 'dotenv';

const port= 5000;
const app= express()
const saltRounds=10;
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
db.connect((err)=>{
    if(err){
        console.log("could not connect to database");
    }
    else{
        console.log("Sucessfully connected");
    }
});

app.get('/', (req,res)=>{
    res.send("hello we are live ");
});

app.get('/hear', (req,res)=>{
    res.send("Hello from backend");
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (result.rows.length >= 1) {
            res.status(409).send("Email or username already exists");
            console.log("This email or username already exists");
        } else { 
            bcrypt.hash(password,saltRounds,async(error,hash)=>{
                try{
                    const ret = await db.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hash]);
                    console.log(ret);
                    res.status(201).send("Registered");
                }catch(err){
                    console.log("error in hashing ", error);
                }
            })
        }
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).send("Internal server error");
    }
});


app.listen(port, ()=>{
    console.log('server is live on port', port);
});