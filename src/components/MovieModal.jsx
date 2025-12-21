import React, { useState } from 'react';
import './MovieModal.css';
import SeatSelection from './SeatSelection';

const MovieModal = ({ movie, onClose }) => {
    const [step, setStep] = useState('details'); // 'details' or 'seats'
    const [selectedShowtime, setSelectedShowtime] = useState(null);

    if (!movie) return null;

    const handleShowtimeSelect = (showtime) => {
        setSelectedShowtime(showtime);
    };

    const handleProceedToSeats = () => {
        if (selectedShowtime) {
            setStep('seats');
        }
    };

    const handleConfirmBooking = (selectedSeats, paymentMethodId) => {
        alert(`Payment successful! (ID: ${paymentMethodId})\n\nBooking confirmed for ${movie.title} at ${selectedShowtime.startTime} for seats: ${selectedSeats.join(', ')}`);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div
                        className="modal-cover"
                        style={{
                            backgroundImage: `url(${movie.coverImage || movie.posterUrl || 'https://via.placeholder.com/800x400'})`
                        }}
                    >
                        <div className="modal-cover-gradient"></div>
                    </div>
                </div>

                <div className="modal-body">
                    {step === 'details' ? (
                        <>
                            <div className="modal-poster-container">
                                <img
                                    src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
                                    alt={movie.title}
                                    className="modal-poster"
                                />
                            </div>

                            <div className="modal-details">
                                <div className="modal-title-section">
                                    <h2 className="modal-title">{movie.title}</h2>
                                    <div className="modal-meta-row">
                                        <span className="modal-badge">{movie.rating ? `⭐ ${movie.rating}/10` : 'Not Rated'}</span>
                                        <span className="modal-meta-item">{movie.durationMinutes} min</span>
                                        <span className="modal-meta-item">{movie.genre}</span>
                                        {movie.trailerUrl && (
                                            <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="trailer-link">
                                                ▶ Watch Trailer
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="modal-description">{movie.description || 'No description available.'}</p>

                                <div className="modal-credits">
                                    {movie.director && (
                                        <div className="credit-item">
                                            <span className="credit-label">Director:</span>
                                            <span className="credit-value">{movie.director}</span>
                                        </div>
                                    )}
                                    {movie.cast && (
                                        <div className="credit-item">
                                            <span className="credit-label">Cast:</span>
                                            <span className="credit-value">{movie.cast}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="showtimes-section">
                                    <h3>Select Showtime</h3>
                                    <div className="showtime-list-container">
                                        {movie.showtimes && movie.showtimes.length > 0 ? (
                                            Object.entries(movie.showtimes.reduce((acc, showtime) => {
                                                const cinemaName = showtime.screen?.cinema?.cinemaName || 'Unknown Cinema';
                                                if (!acc[cinemaName]) acc[cinemaName] = [];
                                                acc[cinemaName].push(showtime);
                                                return acc;
                                            }, {})).map(([cinemaName, times]) => (
                                                <div key={cinemaName} className="cinema-group">
                                                    <h4 className="cinema-group-title">📍 {cinemaName}</h4>
                                                    <div className="showtime-list">
                                                        {times.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).map(showtime => (
                                                            <button
                                                                key={showtime.id}
                                                                className={`showtime-btn ${selectedShowtime?.id === showtime.id ? 'active' : ''}`}
                                                                onClick={() => handleShowtimeSelect(showtime)}
                                                            >
                                                                <span className="time">{new Date(showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <span className="date-hint">{new Date(showtime.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                                                <span className="screen-hint">{showtime.screen?.screenName}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-showtimes">No showtimes scheduled.</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="book-btn-large"
                                    disabled={!selectedShowtime}
                                    onClick={handleProceedToSeats}
                                >
                                    {selectedShowtime ? 'Proceed to Seats' : 'Select a Showtime'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <SeatSelection
                            showtime={selectedShowtime}
                            onConfirm={handleConfirmBooking}
                            onBack={() => setStep('details')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
