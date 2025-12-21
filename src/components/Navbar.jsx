import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="fixed-content-wrapper">
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
                    <li><Link to="/events">EVENTS</Link></li>
                    <li><Link to="/contact">CONTACT</Link></li>
                </ul>

                {/* Right Actions */}
                <div className="navbar-actions">
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
    );
};

export default Navbar;
