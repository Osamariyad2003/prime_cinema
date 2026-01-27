
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

import SearchOverlay from './SearchOverlay';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <>
            <div className={`fixed-content-wrapper ${scrolled ? 'scrolled' : ''}`}>
                <div className="fixed-content" id="main-menu-container">
                    {/* Mobile Menu Toggle */}
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>

                    {/* Logo */}
                    <h1 className="logo">
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <em>PRIME CINEMAS</em>
                        </Link>
                    </h1>

                    {/* Centered Navigation */}
                    <ul className="navbar-menu">
                        <li><Link to="/movies">MOVIES</Link></li>
                        <li><Link to="/club">LOYALTY</Link></li>
                        <li><Link to="/locations">LOCATIONS</Link></li>
                        <li><Link to="/showtimes">SHOWTIMES</Link></li>
                        <li><Link to="/foods-bar">FOODS BAR</Link></li>
                        <li><Link to="/sports">SPORTS</Link></li>
                        <li><Link to="/events">EVENTS</Link></li>
                        <li><Link to="/contact">CONTACT</Link></li>
                    </ul>

                    {/* Right Actions */}
                    <div className="navbar-actions">
                        <button
                            className="btn btn-icon"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                            style={{ marginRight: '16px', border: 'none', padding: '8px' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>

                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <Link to="/dashboard" className="nav-link dashboard-link" style={{ textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>MY ACCOUNT</Link>
                                <button className="btn btn-outline" onClick={logout} style={{ fontSize: '0.7rem' }}>EXIT</button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="btn">SIGN IN</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Navbar;
