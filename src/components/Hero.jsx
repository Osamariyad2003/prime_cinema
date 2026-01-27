import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const HERO_SLIDES = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2560',
        subtitle: 'NOW SHOWING',
        title: 'DUNE: PART TWO',
        description: 'Explore the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge.'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2560',
        subtitle: 'COMING SOON',
        title: 'INTERSTELLAR: IMAX',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2560',
        subtitle: 'PRIME EXPERIENCE',
        title: 'LUXURY REDEFINED',
        description: 'Experience movies like never before with our signature recliner seats and gourmet dining service.'
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    };

    return (
        <section className="hero-slider">
            {HERO_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="hero-overlay"></div>
                    <div className="hero-content container">
                        <span className="hero-subtitle fade-in-up delay-1">{slide.subtitle}</span>
                        <h1 className="hero-title fade-in-up delay-2">{slide.title}</h1>
                        <p className="hero-description fade-in-up delay-3">{slide.description}</p>
                        <div className="hero-actions fade-in-up delay-4">
                            <button className="btn btn-primary" onClick={() => document.getElementById('now-showing').scrollIntoView({ behavior: 'smooth' })}>
                                Get Tickets
                            </button>
                            <Link to="/showtimes">
                                <button className="btn">View Schedule</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="hero-controls">
                <button className="control-btn prev" onClick={prevSlide}>&#10094;</button>
                <div className="indicators">
                    {HERO_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
                <button className="control-btn next" onClick={nextSlide}>&#10095;</button>
            </div>
        </section>
    );
};

export default Hero;
