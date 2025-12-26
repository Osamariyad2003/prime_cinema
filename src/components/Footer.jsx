import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css'; // Remove after migration

const Footer = () => {
    return (
        <footer className="bg-transparent border-t border-white/10 text-white relative z-10 py-10">
            <div className="max-w-3xl mx-auto px-5">
                <div className="flex flex-wrap justify-between gap-8 mb-10">
                    <div className="flex flex-col gap-3 min-w-[180px]">
                        <Link to="/" className="uppercase font-semibold text-base hover:text-red-600 transition">Home</Link>
                        <Link to="/movies" className="uppercase font-semibold text-base hover:text-red-600 transition">Now Selling</Link>
                        <Link to="/movies" className="uppercase font-semibold text-base hover:text-red-600 transition">Coming Soon</Link>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[180px]">
                        <Link to="/locations" className="uppercase font-semibold text-base hover:text-red-600 transition">Cinemas</Link>
                        <Link to="/experiences" className="uppercase font-semibold text-base hover:text-red-600 transition">Events & Experiences</Link>
                        <Link to="/club" className="uppercase font-semibold text-base hover:text-red-600 transition">Loyalty</Link>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[180px]">
                        <a href="https://www.prime.jo/Browsing/General/Ratings" target="_blank" rel="noopener noreferrer" className="uppercase font-semibold text-base hover:text-red-600 transition">Ratings</a>
                        <Link to="/contact" className="uppercase font-semibold text-base hover:text-red-600 transition">Contact Us</Link>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-5 border-t border-white/10 pt-5 text-sm text-gray-400">
                    <a href="https://www.prime.jo/Browsing/General/TermsAndConditions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Terms and Conditions</a>
                    <span className="text-gray-600 text-xs">|</span>
                    <a href="https://www.prime.jo/Browsing/General/Privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Privacy</a>
                    <span className="text-gray-600 text-xs">|</span>
                    <div className="text-xs">&copy; 2024 Prime Cinemas</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
