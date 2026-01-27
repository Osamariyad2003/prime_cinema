import React, { useEffect, useState } from 'react';
import './Sports.css';

import { fetchSportsEvents } from '../services/api';

const Sports = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchSportsEvents();
                setEvents(data);
            } catch (e) {
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    return (
        <section className="sports-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title" style={{ color: 'var(--red)' }}>Sports Events</h2>
                    <div className="section-line"></div>
                </div>
                {loading ? (
                    <p className="loading-text">Loading sports events...</p>
                ) : (
                    <div className="sports-list">
                        {events.map(event => (
                            <div key={event.id} className="sport-card">
                                <div className="sport-poster">
                                    <img
                                        src={event.posterUrl}
                                        alt={event.title}
                                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80'; }}
                                    />
                                </div>
                                <div className="sport-details">
                                    <h3 className="sport-title">{event.title}</h3>
                                    <div className="sport-meta">{event.genre}</div>
                                    <div className="sport-desc">{event.description}</div>
                                    <div className="sport-info"><b>Director:</b> {event.director}</div>
                                    <div className="sport-info"><b>Duration:</b> {event.durationMinutes} min</div>
                                    <div className="sport-info"><b>Release:</b> {event.releaseDate}</div>
                                    <div className="sport-info"><b>Languages:</b> {event.languages?.join(', ')}</div>
                                    <div className={`sport-status ${event.status === 'now_showing' ? 'active' : ''}`}>
                                        {event.status === 'now_showing' ? 'Now Showing' : event.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Sports;
