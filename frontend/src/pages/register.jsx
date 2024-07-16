import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; 

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

    async function handleClick(event){
        event.preventDefault();
        try{
            if(register.email === "" || register.username === "" || register.password === ""){
                navigate('/');
                return;
            }
            const result= await axios.post('/register', register);
            console.log(result);
            setRegister({
                email:"",
                username:"",
                password:"",
            });
            navigate('/SignIn');
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
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleClick}>
                <h1>Create Account</h1>
                <span>use your email for registration</span>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Register;
