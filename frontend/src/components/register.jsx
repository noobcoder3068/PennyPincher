import axios from "axios";
import React, { useState } from "react";
import './register.css';

function Register({ handleRegister, handleSignIn }) {
    const [register, setRegister] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegister(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    };

    async function handleClick(){
        try{
            const result= await axios.post('/register', register);
            console.log(result);
            setRegister({
                email:"",
                username:"",
                password:"",
            });
            handleSignIn();
        }catch(err){
            console.log("HandleClick problem ");
            setRegister({
                email:"",
                username:"",
                password:"",
            });
            handleRegister();
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input 
                type="text"
                placeholder="Email"
                name="email"
                value={register.email}
                onChange={handleChange}
            />
            <input 
                type="text"
                placeholder="Username"
                name="username"
                value={register.username}
                onChange={handleChange}
            />
            <input 
                type="password"
                placeholder="Password"
                name="password"
                value={register.password}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Register</button>
        </div>
    );
}

export default Register;