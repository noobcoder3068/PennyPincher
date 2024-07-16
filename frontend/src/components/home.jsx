import React from "react";
import './home.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Home() {
    return (
        <div className="home-container">
            <h1>PennyPincher</h1>
            <main>
                <section className="hero">
                    <h2>Every Penny Counts: Track and Save with Us</h2>
                    <p>Start managing your finances efficiently with PennyPincher, your ultimate financial companion.
                          Our user-friendly interface helps you create and stick to a budget, ensuring informed decisions about your money.
                         PennyPincher provides the tools you need to stay on top of your finances. 
                        Join our community of savvy savers today and take the first step towards a more secure and prosperous financial future.</p>
                </section>

            <section id="features" class="features-container">
                <h2>Key Features</h2>
                <div class="feature">
                <h3>Expense Tracking</h3>
                <p>Easily log and categorize your expenses to see where your money goes.</p>
                </div>
                <div class="feature">
                <h3>Budget Planning</h3>
                <p>Set budgets for different categories and stay on track with your spending.</p>
                </div>
                <div class="feature">
                <h3>Financial Insights</h3>
                <p>Get detailed insights and reports to make informed financial decisions.</p>
                </div>
                <div class="feature">
                <h3>User-Friendly Interface</h3>
                <p>Enjoy a clean and intuitive design that makes managing your finances simple.</p>
                </div>
            </section>

            <section class="about">
            <h2>About PennyPincher</h2>
            <p>
                Welcome to PennyPincher, your ultimate personal finance tracking application. Our mission is to empower users to take control of their finances with ease and confidence.
            </p>
            <p>
                At PennyPincher, we prioritize security and privacy. All your data is securely stored and only accessible to you. Each user's data is isolated, ensuring that your financial information remains confidential.
            </p>
            <p>
                Our application provides insightful charts and graphs that make understanding your spending and income trends simple and straightforward. With personalized feedback, PennyPincher helps you make informed financial decisions and improve your financial health.
            </p>
            <p>
                PennyPincher is more than just a finance tracker; it's your financial advisor. We offer comprehensive tools that allow you to set budgets, track expenses, and monitor your savings goals. Our intuitive interface makes managing your finances a hassle-free experience.
            </p>
            <p>
                With PennyPincher, you can connect multiple accounts, categorize your transactions, and gain a holistic view of your financial situation. Our advanced analytics provide detailed insights into your spending habits, helping you identify areas where you can save more.
            </p>
            <p>
                We believe in the power of community. Join our growing community of users who share tips and advice on managing finances better. Our platform is designed to be user-friendly, ensuring that both beginners and experienced users can benefit from our features.
            </p>
            <p>
                Your feedback is important to us. We continuously work on improving PennyPincher based on user suggestions and technological advancements. Our goal is to provide you with the best tools and support to achieve your financial goals.
            </p>
            <p>
                Thank you for choosing PennyPincher to manage your finances. Together, we can achieve financial well-being and peace of mind.
            </p>
            </section>

            <section className="social-links">
            <h2>Connect With Me</h2>
            <div className="icons">
                <a href="https://www.linkedin.com/in/abdul00/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon fontSize="large" color="primary"/>
                </a>
                <a href="https://www.instagram.com/abd.ul_aziz_/" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon fontSize="large" sx={{ color: "purple" }}/>
                </a>
                <a href="https://github.com/noobcoder3068" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon fontSize="large" sx={{ color: "white" }}/>
                </a>
                <a href="https://www.github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon fontSize="large" sx={{ color: "lightgreen" }}/>
                </a>
            </div>
            </section>

            </main>
        </div>
    );
}

export default Home;
