import React from "react";
import './home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="Title-h">
                <h1>PennyPincher</h1>
            </div>
            <main>
                <section className="hero">
                    <h2>Your Financial Companion, Simplified</h2>
                    <p>Welcome to PennyPincher, the ultimate tool for taking control of your financial future. 
                          With our easy-to-use interface, you can monitor your expenses, 
                          and analyze your spending patterns to make informed financial decisions. 
                          PennyPincher empowers you to create a budget that works for you, 
                          giving you the clarity and confidence needed to achieve your financial goals. 
                          Join us today and take the first step towards a more secure and prosperous financial future.</p>
                </section>

                {/* <section className="about">
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
                </section> */}
            </main>
        </div>
    );
}

export default Home;
