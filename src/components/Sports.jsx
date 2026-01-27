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
            <h2>Sports</h2>
            {loading ? (
                <p>Loading sports events...</p>
            ) : (
                <div className="sports-list" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                    {events.map(event => (
                        <div key={event.id} className="sport-card" style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            padding: 20,
                            width: 320,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <img
                                src={event.posterUrl}
                                alt={event.title}
                                style={{ width: 160, height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }}
                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80'; }}
                            />
                            <h3 style={{ margin: '8px 0 4px', color: '#0077b6' }}>{event.title}</h3>
                            <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>{event.genre}</div>
                            <div style={{ fontSize: 15, color: '#333', marginBottom: 8 }}>{event.description}</div>
                            <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
                                <b>Director:</b> {event.director}
                            </div>
                            <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
                                <b>Duration:</b> {event.durationMinutes} min
                            </div>
                            <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
                                <b>Release:</b> {event.releaseDate}
                            </div>
                            <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
                                <b>Languages:</b> {event.languages?.join(', ')}
                            </div>
                            <div style={{ fontWeight: 700, color: '#0077b6', fontSize: 16 }}>
                                {event.status === 'now_showing' ? 'Now Showing' : event.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Sports;
