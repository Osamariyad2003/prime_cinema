import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthSelection.css';

const AuthSelection = ({ onGuest, onLogin }) => {
    return (
        <div className="auth-selection-container fade-in">
            <h2 className="section-title text-center">How would you like to continue?</h2>

            <div className="auth-options">
                <div className="auth-card guest">
                    <div className="auth-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <h3>Guest Checkout</h3>
                    <p>Quick booking without creating an account. You'll receive tickets via email.</p>
                    <button className="btn btn-outline" onClick={onGuest}>Continue as Guest</button>
                </div>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <div className="auth-card login">
                    <div className="auth-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                    </div>
                    <h3>Member Sign In</h3>
                    <p>Earn points and save booking details for next time.</p>
                    <button className="btn btn-primary" onClick={onLogin}>Sign In / Register</button>
                </div>
            </div>
        </div>
    );
};

export default AuthSelection;
