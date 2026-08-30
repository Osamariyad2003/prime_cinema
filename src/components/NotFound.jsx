import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 20px',
        color: '#fff'
    }}>
        <h1 style={{ fontSize: '4rem', margin: 0, color: 'var(--red)' }}>404</h1>
        <p style={{ color: '#999', margin: '12px 0 24px' }}>
            We couldn't find the page you're looking for.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
);

export default NotFound;
