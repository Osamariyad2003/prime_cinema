import React, { useState, useEffect } from 'react';
import './CinematicGallery.css';
import { getRandomImage } from '../services/unsplash';

const galleryItems = [
    { id: 1, keyword: 'cinema hall', label: 'Grand Halls' },
    { id: 2, keyword: 'movie theater', label: 'Modern Theaters' },
    { id: 3, keyword: 'film production', label: 'The Craft' },
    { id: 4, keyword: 'film camera', label: 'Pro Equipment' },
    { id: 5, keyword: 'director chair', label: 'Visionary Directing' },
    { id: 6, keyword: 'clapperboard', label: 'Pure Action' },
    { id: 7, keyword: 'hollywood studio', label: 'Studio Magic' }
];

const CinematicGallery = () => {
    const [images, setImages] = useState({});

    useEffect(() => {
        const loadImages = async () => {
            const results = {};
            for (const item of galleryItems) {
                results[item.id] = await getRandomImage(item.keyword);
            }
            setImages(results);
        };
        loadImages();
    }, []);

    return (
        <section className="cinematic-gallery">
            <div className="container">
                <div className="gallery-header">
                    <h2 className="gallery-title">The Art Of Cinema</h2>
                    <p className="gallery-subtitle">A tribute to the world of filmmaking</p>
                </div>
                <div className="gallery-grid">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-card">
                            <div className="gallery-image-wrapper">
                                <img src={images[item.id] || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80"} alt={item.keyword} />
                                <div className="gallery-overlay">
                                    <span className="gallery-label">{item.label}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CinematicGallery;
