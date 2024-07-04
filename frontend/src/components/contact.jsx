import React from 'react';
import './contact.css';

function Contact() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form>
                <label>Name</label>
                <input type="text" name="name" placeholder="Your name" />

                <label>Email</label>
                <input type="email" name="email" placeholder="Your email" />

                <label>Message</label>
                <textarea name="message" placeholder="Your message"></textarea>

                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Contact;
