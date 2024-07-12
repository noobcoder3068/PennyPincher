import React, { useState } from "react";
import axios from "axios";
import "./forgot.css";

function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post('/forgot-password', { email });
            alert('Password reset email sent');
            setEmail(""); 
        } catch (error) {
            console.error('Error sending reset email:', error);
            setError('Error sending reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Forgot;
