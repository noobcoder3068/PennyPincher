import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/contextProvider";

function SignIn() {
    const [login, setLogin] = useState({
        name: "",
        password: "",
    });
    const navigate= useNavigate();
    const {setUser}= useContext(UserContext);

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
            setUser(result.data.user);
            setLogin({
                name: "",
                password: "",
            });
            navigate('/Display');
        } catch (err) {
            console.error("Error in handleClick:", err.response ? err.response.data : err.message);
            setLogin({
                name: "",
                password: "",
            });
            navigate('/');
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

