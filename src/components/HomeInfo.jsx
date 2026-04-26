import React, { useState, useEffect } from 'react';
import './HomeInfo.css';
import { getRandomImage, getRandomImages } from '../services/unsplash';

const HomeInfo = () => {
    const [aboutImg, setAboutImg] = useState('');
    const [cardImgs, setCardImgs] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const mainImg = await getRandomImage('cinema theater luxery');
            const gridImgs = await getRandomImages('movie theater popcorn', 4);
            setAboutImg(mainImg);
            setCardImgs(gridImgs);
        };
        loadImages();
    }, []);

    return (
        <section className="home-info">
            <div className="container">
                <div className="about-container">
                    <div className="about-image">
                        <img src={aboutImg || "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200"} alt="Cinematic Experience" />
                    </div>
                    <div className="about-content">
                        <h2 className="about-title">The Prime Experience</h2>
                        <p className="about-text">
                            Welcome to Prime Cinemas, Jordan's premier destination for entertainment.
                            We combine state-of-the-art technology with unparalleled luxury to provide
                            moviegoers with an unforgettable cinematic journey.
                        </p>
                        <p className="about-text">
                            From the latest Hollywood blockbusters to regional masterpieces, experience it all in the highest quality with our 4K laser projection and immersive sound systems.
                        </p>
                    </div>
                </div>

                <div className="info-grid">
                    <div className="info-card">
                        <div className="info-image-wrapper">
                            <img src={cardImgs[0] || "https://images.unsplash.com/photo-1517604401157-5c57174db04c?w=500&q=80"} alt="Screens" />
                        </div>
                        <h3 className="info-title">Premium Screens</h3>
                        <p className="info-desc">
                            Witness movies like never before on our massive wall-to-wall screens
                            equipped with 4K Laser Projection.
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-image-wrapper">
                            <img src={cardImgs[1] || "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=500&q=80"} alt="Sound" />
                        </div>
                        <h3 className="info-title">Immersive Sound</h3>
                        <p className="info-desc">
                            Feel every moment with Dolby Atmos surround sound technology that
                            moves audio with breathtaking realism.
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-image-wrapper">
                            # Optimize for Web Vitals & Chrome DevTools insights
                        </div>
                        <h3 className="info-title">Gourmet Concessions</h3>
                        <p className="info-desc">
                            Indulge in our wide variety of snacks, from classic buttered popcorn
                            to gourmet nachos and premium beverages.
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-image-wrapper">
                            <img src={cardImgs[3] || "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&q=80"} alt="VIP" />
                        </div>
                        <h3 className="info-title">VIP Service</h3>
                        <p className="info-desc">
                            Upgrade to our VIP Class for exclusive lounge access, fully reclining
                            leather seats, and in-theatre dining.
                        </p>
                    </div>
                </div>
                {/* Social/Contact Section */}
                <div className="contact-social-section" style={{ marginTop: 40, textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--red)' }}>Connect With Us</h2>
                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 24 }}>
                        <a
                            href="https://www.instagram.com/primeamman/?hl=ar"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#E1306C', fontWeight: 700, fontSize: 18 }}
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.facebook.com/primecinemas/?locale=ar_AR"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#1877F3', fontWeight: 700, fontSize: 18 }}
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeInfo;
