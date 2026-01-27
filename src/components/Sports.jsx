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
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            <strong>{event.title}</strong> - {event.date}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Sports;
