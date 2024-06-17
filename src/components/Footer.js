import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Import the CSS file for the footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p>Contact us via: <br /> Email: <a href="mailto:your-email@example.com">email@example.com</a><br /> Phone: 0768648276</p>
            </div>
            <div className="footer-section social-links">
                <h3>Social</h3>
                <ul>
                    <li><a href="https://www.facebook.com/profile.php?id=61554852668631"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
                    <li><a href="https://www.instagram.com/zeroe_018"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
                    <li><a href="https://wa.me/254768648276/"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</a></li>
                </ul>
            </div>
            <div className="footer-section sections">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#data-offers">Data Offers</a></li>
                    <li><a href="#bingwa-minutes-sms">Bingwa Minutes & SMS</a></li>
                    <li><a href="#faqs">FAQs</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

