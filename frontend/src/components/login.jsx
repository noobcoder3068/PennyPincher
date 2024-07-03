import React, { useState } from "react";
import axios from "axios";
import './login.css';

function SignIn({ handleSignIn, handleRegister}) {
    const [login, setLogin] = useState({
        name: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    };

    async function handleClick() {
        try {
            const result = await axios.post('/login', login);
            console.log(result);
            setLogin({
                name: "",
                password: "",
            });
            handleSignIn();
        } catch (err) {
            console.error("Error in handleClick:", err.response ? err.response.data : err.message);
            setLogin({
                name: "",
                password: "",
            });
            handleRegister();
        }
    }

    return (
        <div className="login">
            <h1>Sign In</h1>
            <input 
                type="text"
                placeholder="Email or Username"
                name="name"
                value={login.name}
                onChange={handleChange}
            />
            <input 
                type="password"
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Sign In</button>
        </div>
    );
}

export default SignIn;

