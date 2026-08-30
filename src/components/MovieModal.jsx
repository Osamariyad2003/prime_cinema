import React, { useState, useEffect } from 'react';
import './MovieModal.css';
import BookingFlow from './BookingFlow';
import { fetchMovieById } from '../services/api';

const MovieModal = ({ movie, onClose }) => {
    const [step, setStep] = useState('details'); // 'details' or 'booking'
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [movieDetail, setMovieDetail] = useState(movie);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (movie && movie.id) {
            const loadMovieDetail = async () => {
                setLoading(true);
                try {
                    const data = await fetchMovieById(movie.id);
                    if (data) {
                        setMovieDetail(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch movie details:', error);
                } finally {
                    setLoading(false);
                }
            };
            loadMovieDetail();
        }
        // Only movie.id is read here; re-running on every new `movie` object reference
        // (which changes on each parent render) would refetch unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie?.id]);

    if (!movie) return null;

    const handleShowtimeSelect = (showtime) => {
        setSelectedShowtime(showtime);
    };

    const handleProceedToBooking = () => {
        if (selectedShowtime) {
            setStep('booking');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div
                        className="modal-cover"
                        style={{
                            backgroundImage: `url(${movieDetail.coverImage || movieDetail.posterUrl || 'https://via.placeholder.com/800x400'})`
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
                                    src={movieDetail.posterUrl || 'https://via.placeholder.com/300x450'}
                                    alt={movieDetail.title}
                                    className="modal-poster"
                                />
                            </div>

                            <div className="modal-details">
                                <div className="modal-title-section">
                                    <h2 className="modal-title">{movieDetail.title}</h2>
                                    <div className="modal-meta-row">
                                        <span className="modal-badge">{movieDetail.rating ? `⭐ ${movieDetail.rating}/10` : 'Not Rated'}</span>
                                        <span className="modal-meta-item">{movieDetail.durationMinutes} min</span>
                                        <span className="modal-meta-item">{movieDetail.genre}</span>
                                        {movieDetail.trailerUrl && (
                                            <a href={movieDetail.trailerUrl} target="_blank" rel="noopener noreferrer" className="trailer-link">
                                                ▶ Watch Trailer
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="modal-description">{movieDetail.description || 'No description available.'}</p>

                                <div className="modal-credits">
                                    {movieDetail.director && (
                                        <div className="credit-item">
                                            <span className="credit-label">Director:</span>
                                            <span className="credit-value">{movieDetail.director}</span>
                                        </div>
                                    )}
                                    {movieDetail.cast && (
                                        <div className="credit-item">
                                            <span className="credit-label">Cast:</span>
                                            <span className="credit-value">{movieDetail.cast}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="showtimes-section">
                                    <h3>Select Showtime</h3>
                                    <div className="showtime-list-container">
                                        {loading ? (
                                            <div className="loading-showtimes">Loading showtimes...</div>
                                        ) : (movieDetail.showtimes && movieDetail.showtimes.filter(st => new Date(st.startTime) > new Date()).length > 0) ? (
                                            Object.entries(movieDetail.showtimes
                                                .filter(st => new Date(st.startTime) > new Date())
                                                .reduce((acc, showtime) => {
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
                                            <p className="no-showtimes">No upcoming showtimes available.</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="book-btn-large"
                                    disabled={!selectedShowtime}
                                    onClick={handleProceedToBooking}
                                >
                                    {selectedShowtime ? 'Proceed to Seats' : 'Select a Showtime'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <BookingFlow
                            showtime={selectedShowtime}
                            onBack={() => setStep('details')}
                            onComplete={() => onClose()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
