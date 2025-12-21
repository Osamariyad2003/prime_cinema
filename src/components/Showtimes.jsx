import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api';
import './Showtimes.css';
import './MovieModal.css';
import SeatSelection from './SeatSelection';
import MovieModal from './MovieModal';

const Showtimes = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [showSeatMap, setShowSeatMap] = useState(false);

    // Generate upcoming dates
    const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            const targetDate = dates[selectedDate];
            const data = await fetchMovies(targetDate);
            setMovies(data);
            setLoading(false);
        };
        loadMovies();
    }, [selectedDate]);

    // Flatten logic: Extract all showtime sessions from all movies into a single list
    const sessions = movies.reduce((acc, movie) => {
        if (!movie.showtimes || movie.showtimes.length === 0) return acc;

        const movieSessions = movie.showtimes.map(st => ({
            ...st,
            movieTitle: movie.title,
            moviePoster: movie.posterUrl,
            cinemaName: st.screen?.cinema?.cinemaName || 'Unknown Cinema',
            screenName: st.screen?.screenName || 'Standard Screen'
        }));

        return [...acc, ...movieSessions];
    }, []).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    const handleSeatClick = (session) => {
        setSelectedShowtime(session);
        setShowSeatMap(true);
    };

    const handleConfirmBooking = (selectedSeats, paymentMethodId) => {
        alert(`Payment successful! (ID: ${paymentMethodId})\n\nBooking confirmed for ${selectedShowtime.movieTitle} at ${new Date(selectedShowtime.startTime).toLocaleTimeString()} for seats: ${selectedSeats.join(', ')}`);
        setShowSeatMap(false);
        setSelectedShowtime(null);
    };


    const CalendarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    );
    const ClockIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    );
    const PinIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', color: '#D32F2F' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    );
    const SeatIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9h-4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"></path><path d="M5 9H9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z"></path></svg>
    );
    const TimeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    );

    if (loading) return <div className="showtimes-page container" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading Schedule...</div>;

    return (
        <div className="showtimes-page">
            <div className="container" style={{ paddingTop: '100px' }}>

                {/* Header */}
                <div className="showtimes-header-container">
                    <div>
                        <div className="showtimes-title-group">
                            <ClockIcon />
                            <h1 className="page-title">Showtime Schedule</h1>
                        </div>
                        <p className="page-subtitle">Plan the premiere experiences</p>
                    </div>

                </div>

                {/* Date Selector */}
                <div className="date-section-label">
                    <CalendarIcon /> Select Date
                </div>

                <div className="date-scroll-wrapper">
                    {dates.map((date, index) => {
                        const isSelected = index === selectedDate;
                        return (
                            <div
                                key={index}
                                className={`date-card ${isSelected ? 'active' : ''}`}
                                onClick={() => setSelectedDate(index)}
                            >
                                <span className="date-card-day">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                <span className="date-card-num">{date.getDate()}</span>
                                <span className="date-card-month">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Sessions Grid */}
                <div className="sessions-grid" style={{ marginTop: '30px' }}>
                    {sessions.length > 0 ? (
                        sessions.map(session => (
                            <div key={session.id} className="session-card">
                                <div className="session-main">
                                    <img src={session.moviePoster} alt={session.movieTitle} className="session-poster" />
                                    <div className="session-info">
                                        <h3 className="session-movie-title">{session.movieTitle}</h3>
                                        <div className="session-location">
                                            <PinIcon />
                                            {session.cinemaName} - {session.screenName}
                                        </div>
                                        <div className="session-time-badge">
                                            <TimeIcon /> {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="session-footer">
                                    <span className="session-price">
                                        {session.price ? session.price.toFixed(2) : '10.00'} JOD
                                    </span>
                                    <button className="btn-seats" onClick={() => handleSeatClick(session)}>
                                        <SeatIcon /> Seats
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                            No showtimes scheduled for this date.
                        </div>
                    )}
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
                                    {selectedShowtime.cinemaName} - {selectedShowtime.screenName} | {new Date(selectedShowtime.startTime).toLocaleString()}
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
        </div>
    );
};

export default Showtimes;
