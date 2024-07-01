import express from 'express';
import axios from 'axios';
import cors from'cors';

const port= 5000;
const app= express()
app.use(cors());

app.get('/', (req,res)=>{
    res.send("hello we are live ");
});

app.get('/hear', (req,res)=>{
    res.send("Hello from backend");
});

app.listen(port, ()=>{
    console.log('server is live on port', port);
});