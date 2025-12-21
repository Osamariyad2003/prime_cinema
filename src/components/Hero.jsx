import React, { useState, useEffect } from 'react';
import './Hero.css';
import { getRandomImage } from '../services/unsplash';

const Hero = () => {
    const [heroImg, setHeroImg] = useState('');

    useEffect(() => {
        const loadHeroImg = async () => {
            const img = await getRandomImage('cinema theater empty background');
            setHeroImg(img);
        };
        loadHeroImg();
    }, []);

    return (
        <section className="hero">
            <div
                className="hero-image-bg"
                style={{
                    backgroundImage: `url(${heroImg || 'https://images.unsplash.com/photo-1517604931442-71053e6e2619?q=80&w=2560'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            ></div>
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
