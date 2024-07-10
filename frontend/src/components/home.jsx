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
                         Effortlessly track your income and expenses, gain insights into your spending habits, and set achievable financial goals.
                          Our user-friendly interface helps you create and stick to a budget, ensuring informed decisions about your money.
                         Whether saving for a big purchase, planning for retirement, or reducing debt, PennyPincher provides the tools you need to stay on top of your finances. 
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
            <h2>About Us</h2>
            <p>
            PennyPincher is designed to help you take control of your finances effectively and efficiently. 
            With our intuitive platform, you can effortlessly track your expenses, categorize spending, and 
            analyze trends to understand where your money goes. Plan your budget with confidence using customizable 
            categories and spending limits, ensuring you stay on track towards your financial objectives.

            Our commitment is to empower you with insightful tools that foster financial literacy and discipline. 
            Gain actionable insights into your financial habits, identify areas for improvement, and make informed 
            decisions to optimize your financial health. Whether you're saving for a major purchase, planning for retirement, 
            or reducing debt, PennyPincher equips you with the resources to achieve financial stability and realize your 
            long-term financial aspirations.

            Join PennyPincher today and embark on your journey towards financial empowerment and security.</p>
            </section>

            <section className="social-links">
            <h2>Connect With Me</h2>
            <div className="icons">
                <a href="https://www.linkedin.com/in/abdul00/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon fontSize="large"/>
                </a>
                <a href="https://www.instagram.com/abd.ul_aziz_/" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon fontSize="large"/>
                </a>
                <a href="https://github.com/noobcoder3068" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon fontSize="large"/>
                </a>
                <a href="https://www.github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon fontSize="large"/>
                </a>
            </div>
            </section>

            </main>
        </div>
    );
}

export default Home;
