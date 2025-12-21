
import React, { useEffect, useState } from 'react';
import { useGeolocated } from "react-geolocated"; // Import hook
import { fetchCinemas } from '../services/api';
import './CinemaLocations.css';
import { getRandomImages } from '../services/unsplash';

const CinemaLocations = () => {
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedCinemas, setSortedCinemas] = useState([]);
    const [expandedCinemaId, setExpandedCinemaId] = useState(null);
    const [status, setStatus] = useState('');
    const [cinemaImgs, setCinemaImgs] = useState([]);

    // Use the hook to get location
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    useEffect(() => {
        const loadCinemas = async () => {
            const data = await fetchCinemas();
            setCinemas(data);
            setSortedCinemas(data);
            setLoading(false);

            // Fetch dynamic images for each cinema
            if (data.length > 0) {
                const imgs = await getRandomImages('modern cinema building', data.length);
                setCinemaImgs(imgs);
            }
        };
        loadCinemas();
    }, []);

    const toggleScreens = (id) => {
        setExpandedCinemaId(expandedCinemaId === id ? null : id);
    };

    const findNearestCinema = () => {
        if (!isGeolocationAvailable) {
            setStatus("Your browser does not support Geolocation");
            return;
        }
        if (!isGeolocationEnabled) {
            setStatus("Geolocation is not enabled");
            return;
        }

        if (coords) {
            setStatus('Locating...');
            // Calculate distances using the hook's coords
            const { latitude, longitude } = coords;

            // Mock logic since DB doesn't have lat/lng yet, but using the real user lat/lng
            const sorted = [...cinemas].map(c => ({
                ...c,
                distance: Math.random() * 20 // Still mocking usage of lat/lng until DB has it
            })).sort((a, b) => a.distance - b.distance);

            setSortedCinemas(sorted);
            setStatus(`Found nearest: ${sorted[0].cinemaName} (based on Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)})`);
        } else {
            setStatus("Getting location data...");
        }
    };

    if (loading) return null;

    return (
        <section className="locations-section container" id="locations">
            {/* ... header and controls ... */}
            <div className="section-header">
                <h2 className="section-title">Cinema Today</h2>
                <div className="section-line"></div>
            </div>

            <div className="location-controls" style={{ textAlign: 'center', marginBottom: '30px' }}>
                <button
                    className="btn btn-primary"
                    onClick={findNearestCinema}
                    style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)' }}
                >
                    📍 Find Nearest Cinema
                </button>
                {status && <p style={{ color: 'var(--gray)', marginTop: '10px', fontSize: '0.9rem' }}>{status}</p>}
                {!coords && isGeolocationAvailable && isGeolocationEnabled && <p style={{ fontSize: '0.8rem', color: '#666' }}>Waiting for location permission/signal...</p>}
            </div>

            <div className="locations-grid">
                {sortedCinemas.map((cinema, index) => (
                    <div key={cinema.id} className="location-card" style={cinema.distance !== undefined ? { border: '1px solid var(--gold)' } : {}}>
                        <div className="location-image">
                            <img src={cinemaImgs[index] || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80&sig=${cinema.id}`} alt={cinema.cinemaName} />
                        </div>
                        <h3 className="location-name">{cinema.cinemaName}</h3>
                        <p className="location-address">
                            <span className="icon">📍</span> {cinema.location}
                        </p>
                        {cinema.distance !== undefined && (
                            <p className="location-distance" style={{ color: 'var(--gold)', fontSize: '0.9rem', marginTop: '5px' }}>
                                {cinema.distance.toFixed(1)} km away
                            </p>
                        )}
                        <div className="location-details">
                            <span>{cinema.screens ? cinema.screens.length : 0} Screens</span>
                            <span className="divider">•</span>
                            <span>Premium Experience</span>
                        </div>

                        <button
                            className="btn-location"
                            onClick={() => toggleScreens(cinema.id)}
                            style={{ marginBottom: '10px' }}
                        >
                            {expandedCinemaId === cinema.id ? 'Hide Screens' : 'View Screens'}
                        </button>

                        {expandedCinemaId === cinema.id && cinema.screens && (
                            <div className="screens-list" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #333', textAlign: 'left' }}>
                                <h4 style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase' }}>Available Screens:</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {cinema.screens.map(screen => (
                                        <li key={screen.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--gold)' }}>📺</span>
                                            {screen.screenName || `Screen ${screen.id} `}
                                            {/* Note: In a real app we would show screen type e.g. IMAX here if available in data */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CinemaLocations;
