import React, { useState, useEffect } from 'react';
import { fetchShowtimes, createBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './HomeShowtimes.css';
import SeatSelection from './SeatSelection';

const HomeShowtimes = () => {
    const { token } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [showSeatMap, setShowSeatMap] = useState(false);

    useEffect(() => {
        const loadTodayShowtimes = async () => {
            try {
                const data = await fetchShowtimes(new Date());
                setSessions(data);
            } catch (error) {
                console.error('Failed to load today showtimes:', error);
            } finally {
                setLoading(false);
            }
        };
        loadTodayShowtimes();
    }, []);


    const handleSeatClick = (session) => {
        setSelectedShowtime(session);
        setShowSeatMap(true);
    };

    const handleConfirmBooking = async (selectedSeats, paymentMethodId) => {
        try {
            await createBooking({
                showtimeId: selectedShowtime.id,
                seats: selectedSeats,
                paymentId: paymentMethodId
            }, token);
            alert(`Booking successful! Seats: ${selectedSeats.join(', ')}`);
            setShowSeatMap(false);
        } catch (error) {
            alert(`Booking failed: ${error.message}`);
        }
    };

    if (loading) return <div className="home-showtimes loading">Loading Schedule...</div>;
    if (sessions.length === 0) return null;

    return (
        <section className="home-showtimes">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Today's Schedule</h2>
                    <p className="section-subtitle">Catch the next premiere</p>
                </div>

                <div className="showtimes-scroll">
                    {sessions.slice(0, 10).map(session => (
                        <div key={session.id} className="home-session-card">
                            <div className="session-time">
                                {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="session-details">
                                <h4 className="session-movie">{session.movieTitle}</h4>
                                <p className="session-location">{session.cinemaName}</p>
                            </div>
                            <button className="btn-mini-book" onClick={() => handleSeatClick(session)}>
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showSeatMap && selectedShowtime && (
                <div className="modal-overlay" onClick={() => setShowSeatMap(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '1000px', width: '95%' }}>
                        <button className="close-btn" onClick={() => setShowSeatMap(false)}>×</button>
                        <div className="modal-body" style={{ padding: '0', marginTop: '0', display: 'block' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid #333', background: '#111' }}>
                                <h2 style={{ margin: 0, color: '#fff' }}>{selectedShowtime.movieTitle}</h2>
                                <p style={{ margin: '5px 0 0', color: '#aaa' }}>
                                    {selectedShowtime.cinemaName} | {new Date(selectedShowtime.startTime).toLocaleTimeString()}
                                </p>
                            </div>
                            <SeatSelection
                                showtime={selectedShowtime}
                                onConfirm={handleConfirmBooking}
                                onBack={() => setShowSeatMap(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HomeShowtimes;
