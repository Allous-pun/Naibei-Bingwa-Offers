import React, { useState } from 'react';
import './Header.css'; // Import the CSS file for the header

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>Naibei-Bingwa Offers</h1>
            </div>
            <nav className={`header-right ${isOpen ? 'open' : ''}`}>
                <a href="#data-offers" onClick={toggleMenu}>Data Offers</a>
                <a href="#bingwa-minutes-sms" onClick={toggleMenu}>Minutes & SMS</a>
                <a href="#faqs" onClick={toggleMenu}>FAQs</a>
            </nav>
            <div className="hamburger" onClick={toggleMenu}>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            </div>
        </header>
    );
};

export default Header;

