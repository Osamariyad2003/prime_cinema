import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-columns">
                    <div className="footer-col">
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/movies" className="footer-link">Now Selling</Link>
                        <Link to="/movies" className="footer-link">Coming Soon</Link>
                    </div>
                    <div className="footer-col">
                        <Link to="/locations" className="footer-link">Cinemas</Link>
                        <Link to="/experiences" className="footer-link">Events & Experiences</Link>
                        <Link to="/club" className="footer-link">Loyalty</Link>
                    </div>
                    <div className="footer-col">
                        <a href="https://www.prime.jo/Browsing/General/Ratings" target="_blank" rel="noopener noreferrer" className="footer-link">Ratings</a>
                        <Link to="/contact" className="footer-link">Contact Us</Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <a href="https://www.prime.jo/Browsing/General/TermsAndConditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                    <span className="footer-divider">|</span>
                    <a href="https://www.prime.jo/Browsing/General/Privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
                    <span className="footer-divider">|</span>
                    <div className="copyright">
                        Copyright 2024 Prime Cinemas
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
