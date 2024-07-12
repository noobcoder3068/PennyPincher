import React from 'react';
import './about.css';
import abdImage from './abd.jpg';

function AboutUs() {
    return (
        <div className="about-us-container">
            <h1>About Me</h1>
            <div className='image-abd'>
                <img src={abdImage} alt='image-mine' />
            </div>
            <div className="about-content">
                <p>
                    Welcome to PennyPincher! I am Abdulaziz Shaikh, the creator of this website. I have developed both the frontend and backend of this project all by myself. It took me almost half a month to bring this project to life. My goal was to create an efficient and user-friendly Personal Finance Tracker to help users manage their finances effectively.
                </p>
                <p>
                    About me: I am a student at the National Institute of Technology (NIT) Kurukshetra, currently pursuing a Bachelor of Technology (B.Tech) degree in Information Technology. As a passionate full-stack developer, I have honed my skills in various web technologies and programming languages. My expertise includes working with React, Node.js, Express, and PostgreSQL, among other tools and frameworks. I am dedicated to creating robust, scalable, and intuitive applications, and I continuously strive to learn and grow in the field of software development.
                </p>
                <p>
                    When I'm not coding, I enjoy exploring new technologies, participating in hackathons, and contributing to open-source projects. I believe in the power of technology to solve real-world problems and am excited about the future of software development.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
