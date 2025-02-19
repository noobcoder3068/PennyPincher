import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./login.css"; // Import the CSS file

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
            if (login.name === "" && login.password === "") {
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
            navigate(`/${user_id}/Display`);
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
        <div className="signin-form-container">
            <form className="signin-form" onSubmit={handleSubmit}>
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
                <NavLink to="/Forgot-password" className="forgot-pass">Forgot Password</NavLink>
                <button type="submit">Sign In</button>
                <NavLink to="/Register" className="Reg">Haven't Registered?</NavLink>
            </form>
        </div>
    );
}

export default SignIn;
