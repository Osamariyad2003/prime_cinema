import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2>PRIME CINEMAS</h2>
                        <p>Experience movies like never before.</p>
                    </div>

                    <div className="footer-links-group">
                        <h3>Discover</h3>
                        <Link to="/movies">Now Showing</Link>
                        <Link to="/movies">Coming Soon</Link>
                        <Link to="/showtimes">Showtimes</Link>
                    </div>

                    <div className="footer-links-group">
                        <h3>Experience</h3>
                        <Link to="/locations">Cinemas</Link>
                        <Link to="/club">Loyalty Club</Link>
                        <Link to="/events">Events</Link>
                    </div>

                    <div className="footer-links-group">
                        <h3>Support</h3>
                        <Link to="/contact">Contact Us</Link>
                        <a href="https://www.prime.jo/Browsing/General/Ratings" target="_blank" rel="noopener noreferrer">Ratings</a>
                        <a href="https://www.prime.jo/Browsing/General/TermsAndConditions" target="_blank" rel="noopener noreferrer">Terms</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Prime Cinemas. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
