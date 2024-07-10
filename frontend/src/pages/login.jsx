import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [login, setLogin] = useState({
        name: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (login.name === "" || login.password === "") {
                navigate('/');
                return;
            }
            const result = await axios.post('/login', login);
            console.log(result);
            const user_id = result.data.user.id;
            setLogin({
                name: "",
                password: "",
            });
            navigate(`/Display/${user_id}`);
        } catch (err) {
            console.error("Error in handleSubmit:", err.response ? err.response.data : err.message);
            setLogin({
                name: "",
                password: "",
            });
            navigate('/');
        }
    }

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <span>use your account</span>
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
                <a href="#">Forgot your password?</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
