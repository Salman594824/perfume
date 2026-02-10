// Assuming the social media links are added in a structured way. This is a generalized example of how the interactions could be incorporated:
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="social-icons">
                <a href="https://instagram.com/montclaire01" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://pinterest.com/montclaire91" target="_blank" rel="noopener noreferrer">Pinterest</a>
                <a href="https://tiktok.com/@montclaire001" target="_blank" rel="noopener noreferrer">TikTok</a>
                <a href="https://wa.me/923371292112" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
            <div className="contact-information">
                <p>For inquiries, reach us on:</p>
                <p>Instagram: <a href="https://instagram.com/montclaire01">@montclaire01</a></p>
                <p>Pinterest: <a href="https://pinterest.com/montclaire91">@montclaire91</a></p>
                <p>TikTok: <a href="https://tiktok.com/@montclaire001">@montclaire001</a></p>
                <p>WhatsApp: <a href="https://wa.me/923371292112">Chat with us</a></p>
            </div>
            <div className="footer-links">
                <a href="https://instagram.com/montclaire01">Instagram</a>
                <a href="https://pinterest.com/montclaire91">Pinterest</a>
                <a href="https://tiktok.com/@montclaire001">TikTok</a>
                <a href="https://wa.me/923371292112">WhatsApp</a>
            </div>
        </footer>
    );
};

export default Footer;