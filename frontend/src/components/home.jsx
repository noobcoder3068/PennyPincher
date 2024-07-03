import React from "react";
import './home.css';

function Home({ goToSignIn, goToRegister, isLoggedIn, handleLogout }) {
    return (
        <div className="home-container">
            <h1>Welcome to PennyPincher</h1>
            <main>
                <section className="hero">
                    <h2>Your Personal Finance Tracker</h2>
                    <p>Start managing your finances efficiently with PennyPincher.</p>
                    {!isLoggedIn ? (
                        <div>
                            <button onClick={goToSignIn}>Sign In</button>
                            <button onClick={goToRegister}>Register</button>
                        </div>
                    ) : (
                        <div>
                            <p>Welcome, you are logged in!</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </section>

                <section className="features">
                    <h2>Key Features</h2>
                    <ul>
                        <li>Expense Tracking</li>
                        <li>Budget Planning</li>
                        <li>Reports and Insights</li>
                    </ul>
                </section>
            </main>

        </div>
    );
}

export default Home;
