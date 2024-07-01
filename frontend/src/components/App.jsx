import React, { useEffect, useState } from "react";
import axios from 'axios';

function App(){

    const [message, setMessage]= useState("");

    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const resp= await axios.get('http://localhost:5000/hear');
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
    </div>
}

export default App;