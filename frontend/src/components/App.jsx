import React, { useEffect, useState } from "react";
import axios from 'axios';
import Footer from './footer';
import Register from "./register";

function App(){

    const [message, setMessage]= useState("");

    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const resp= await axios.get('/hear');
                setMessage(resp.data);
                console.log(resp);
            }catch(err){
                console.log("fetching error");
            }
        }
        fetchData();
    },[]);

    return <div>
        <h1>hey bud</h1>
        <p>{message}</p>
        <Register />
        <Footer />
    </div>
}

export default App;