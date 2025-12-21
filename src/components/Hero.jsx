import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <video
                className="hero-video-bg"
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1517604931442-71053e6e2619?q=80&w=2560"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-cinema-screen-in-a-dark-room-4050-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content container fade-in">
                <span className="hero-subtitle">NOW SHOWING</span>
                <h1 className="hero-title">Experience The Magic</h1>
                <p className="hero-description">
                    Immerse yourself in luxury at Prime Cinemas.
                    The ultimate premiere destination for movie lovers.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary" onClick={() => document.getElementById('movies').scrollIntoView({ behavior: 'smooth' })}>Get Tickets</button>
                    <button className="btn" onClick={() => document.getElementById('movies').scrollIntoView({ behavior: 'smooth' })}>View Showtimes</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
