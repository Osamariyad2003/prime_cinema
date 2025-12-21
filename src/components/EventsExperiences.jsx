import React, { useState, useEffect } from 'react';
import './EventsExperiences.css';
import { getRandomImage } from '../services/unsplash';

const experiences = [
    {
        id: 'cinebistro',
        name: 'Cine Bistro',
        badge: 'Premier Dining',
        description: 'Indulge in a world-class culinary journey while watching your favorite films. Our Cine Bistro offers a full-service menu delivered right to your seat.',
        features: [
            'Chef-inspired gourmet menu',
            'In-theatre seat-side service',
            'Curated wine and cocktail list',
            'Exclusive premium lounge access'
        ],
        image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80'
    },
    {
        id: 'diamond',
        name: 'Diamond',
        badge: 'Ultimate Luxury',
        description: 'The pinnacle of cinematic luxury. Featuring private booths and the absolute best in sound and visual technology.',
        features: [
            'Private oversized leather recliners',
            'Personal butler service',
            '4K Laser projection technology',
            'Dolby Atmos 360-degree sound'
        ],
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80'
    },
    {
        id: 'plus',
        name: 'Plus',
        badge: 'Enhanced Comfort',
        description: 'Perfect for families and film enthusiasts alike. Experience extra legroom and upgraded amenities for a superior viewing experience.',
        features: [
            'Extra-wide ergonomic seating',
            'Reserved preferred viewing area',
            'Complimentary bottomless popcorn',
            'Dedicated express concession lane'
        ],
        image: 'https://images.unsplash.com/photo-1478720143022-10d98ee0ae11?w=800&q=80'
    },
    {
        id: 'star',
        name: 'Star',
        badge: 'The Classic Choice',
        description: 'Our signature Prime experience. Crystal clear projection and massive screens that make every seat the best seat in the house.',
        features: [
            'Wall-to-wall cinematic screens',
            'State-of-the-art digital audio',
            'Contemporary stadium seating',
            'Signature Prime atmosphere'
        ],
        image: 'https://images.unsplash.com/photo-1517604401157-5c57174db04c?w=800&q=80'
    }
];

const EventsExperiences = () => {
    const [activeTab, setActiveTab] = useState('star');
    const [dynamicImgs, setDynamicImgs] = useState({});

    useEffect(() => {
        const loadImages = async () => {
            const results = {};
            for (const exp of experiences) {
                // Combine experience name with 'cinema' for better relevance
                results[exp.id] = await getRandomImage(`${exp.name} cinema luxury`);
            }
            setDynamicImgs(results);
        };
        loadImages();
    }, []);

    const activeExp = experiences.find(e => e.id === activeTab) || experiences[3];

    return (
        <section className="experiences-section">
            <div className="container">
                <div className="experiences-header">
                    <h2 className="experiences-title">Events & Experiences</h2>
                    <div className="experience-tabs">
                        {experiences.map(exp => (
                            <button
                                key={exp.id}
                                className={`exp-tab ${activeTab === exp.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(exp.id)}
                            >
                                {exp.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="experience-content" key={activeExp.id}>
                    <div className="exp-image-container">
                        <img src={dynamicImgs[activeExp.id] || activeExp.image} alt={activeExp.name} />
                    </div>
                    <div className="exp-text-container">
                        <span className="exp-badge">{activeExp.badge}</span>
                        <h3 className="exp-name">{activeExp.name}</h3>
                        <p className="exp-description">{activeExp.description}</p>
                        <ul className="exp-features">
                            {activeExp.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                        <button className="btn btn-primary" style={{ padding: '15px 40px' }}>Explore {activeExp.name}</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsExperiences;
