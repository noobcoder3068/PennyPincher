import axios from "axios";
import React,{useState} from "react";

function Register(props){
    const [details, setDetails]= useState({
        email:"",
        username:"",
        password:"",
    });

    function handleChange(event){
        const {name, value}= event.target;
        console.log(name, value);
        setDetails(prevValue=>(
            {...prevValue, [name]:value}
        ));
    }

    async function handleClick(){
        try{
            const result= await axios.post('/register', details);
            console.log(result);
            setDetails({
                email:"",
                username:"",
                password:"",
            });
        }catch(err){
            console.log("HandleClick problem ");
            setDetails({
                email:"",
                username:"",
                password:"",
            });
        }
    }

return <div className="Register">
    <h1>Sign Up</h1>
    <input 
    type="text"
    placeholder="email"
    name="email"
    value={details.email}
    onChange={handleChange}
    />
    <input 
    type="text"
    placeholder="username"
    name="username"
    value={details.username}
    onChange={handleChange}
    />
    <input 
    type="password"
    placeholder="password"
    name="password"
    value={details.password}
    onChange={handleChange}
    />
    <button onClick={handleClick}>save</button>
</div>
}

export default Register; 