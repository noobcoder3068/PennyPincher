import React from "react";
import './home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to PennyPincher</h1>
            <main>
                <section className="hero">
                    <h2>Your Personal Finance Tracker</h2>
                    <p>Start managing your finances efficiently with PennyPincher.</p>
                </section>

                <section className="about">
                    <h2>About Us</h2>
                    <p>
                        PennyPincher is designed to help you take control of your finances. With our easy-to-use platform, you can track your expenses, plan your budget, and gain insights into your financial habits. Our goal is to provide you with the tools you need to achieve financial stability and reach your financial goals.
                    </p>
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
