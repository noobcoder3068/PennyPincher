import React from 'react';
import './contact.css';
import SendIcon from '@mui/icons-material/Send';

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

                <div className='butt'>
                    <SendIcon>Send</SendIcon>
                </div>
            </form>
        </div>
    );
}

export default Contact;
