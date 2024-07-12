import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function NewPass() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/reset-password/${token}`, { password });
            alert('Password has been reset');
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Error resetting password');
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                <input
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default NewPass;
