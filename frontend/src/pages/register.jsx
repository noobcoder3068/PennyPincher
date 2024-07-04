import axios from "axios";
import React, { useState } from "react";
import './register.css';
import { useNavigate } from "react-router-dom";

function Register() {
    const [register, setRegister] = useState({
        email: "",
        username: "",
        password: "",
    });
    const navigate= useNavigate();

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
            navigate('/Display');
        }catch(err){
            console.error("HandleClick problem:", err.response ? err.response.data : err.message);
            setRegister({
                email:"",
                username:"",
                password:"",
            });
            navigate('/');
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