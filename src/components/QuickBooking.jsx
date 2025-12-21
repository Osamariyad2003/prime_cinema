import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import './QuickBooking.css';
import './MovieModal.css';
import SeatSelection from './SeatSelection';

const QuickBooking = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [selectedCinemaId, setSelectedCinemaId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeId, setSelectedTimeId] = useState('');
    const [showSeatMap, setShowSeatMap] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            const data = await fetchMovies();
            setMovies(data);
        };
        loadMovies();
    }, []);

    // 1. Get Selected Movie
    const selectedMovie = movies.find(m => m.id === parseInt(selectedMovieId));

    // 2. Get Unique Cinemas participating in this move
    // We treat "cinema" as unique by ID or Name. Since logic uses implicit showtimes structure:
    // showtime -> screen -> cinema
    const availableCinemas = selectedMovie?.showtimes
        ? [...new Map(selectedMovie.showtimes
            .filter(st => st.screen?.cinema)
            .map(st => [st.screen.cinema.id, st.screen.cinema])
        ).values()]
        : [];

    // 3. Get Dates for Movie + Cinema
    const availableDates = selectedMovie?.showtimes && selectedCinemaId
        ? [...new Set(selectedMovie.showtimes
            .filter(st => st.screen?.cinema?.id === parseInt(selectedCinemaId))
            .map(st => st.startTime.split('T')[0]))
        ].sort()
        : [];

    // 4. Get Times for Movie + Cinema + Date
    const availableTimes = selectedMovie?.showtimes && selectedCinemaId && selectedDate
        ? selectedMovie.showtimes
            .filter(st =>
                st.screen?.cinema?.id === parseInt(selectedCinemaId) &&
                st.startTime.startsWith(selectedDate)
            )
            .map(st => ({
                id: st.id,
                time: new Date(st.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }))
            .sort((a, b) => a.time.localeCompare(b.time))
        : [];

    const handleBook = () => {
        if (selectedTimeId) {
            const st = selectedMovie.showtimes.find(st => st.id === parseInt(selectedTimeId));
            setSelectedShowtime({
                ...st,
                movieTitle: selectedMovie.title,
                cinemaName: st.screen?.cinema?.cinemaName || 'Selected Cinema',
                screenName: st.screen?.screenName || 'Standard Screen'
            });
            setShowSeatMap(true);
        }
    };

    const handleConfirmBooking = (selectedSeats, paymentMethodId) => {
        alert(`Payment successful! (ID: ${paymentMethodId})\n\nBooking confirmed for ${selectedMovie.title} at ${selectedShowtime.startTime} for seats: ${selectedSeats.join(', ')}`);
        setShowSeatMap(false);
    };

    return (
        <div className="quick-booking-container container">
            <div className="quick-booking-bar">
                {/* 1. MOVIE */}
                <div className="qb-item">
                    <label>Pick a Movie</label>
                    <select
                        value={selectedMovieId}
                        onChange={(e) => {
                            setSelectedMovieId(e.target.value);
                            setSelectedCinemaId('');
                            setSelectedDate('');
                            setSelectedTimeId('');
                        }}
                    >
                        <option value="">Select Movie</option>
                        {movies.map(m => (
                            <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                    </select>
                </div>

                {/* 2. CINEMA */}
                <div className="qb-item">
                    <label>Pick a Cinema</label>
                    <select
                        value={selectedCinemaId}
                        onChange={(e) => {
                            setSelectedCinemaId(e.target.value);
                            setSelectedDate('');
                            setSelectedTimeId('');
                        }}
                        disabled={!selectedMovieId}
                    >
                        <option value="">Select Cinema</option>
                        {availableCinemas.map(c => (
                            <option key={c.id} value={c.id}>{c.cinemaName}</option>
                        ))}
                    </select>
                </div>

                {/* 3. DATE */}
                <div className="qb-item">
                    <label>Pick a Date</label>
                    <select
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTimeId('');
                        }}
                        disabled={!selectedCinemaId}
                    >
                        <option value="">Select Date</option>
                        {availableDates.map(date => (
                            <option key={date} value={date}>{new Date(date).toDateString()}</option>
                        ))}
                    </select>
                </div>

                {/* 4. TIME */}
                <div className="qb-item">
                    <label>Pick a Time</label>
                    <select
                        value={selectedTimeId}
                        onChange={(e) => setSelectedTimeId(e.target.value)}
                        disabled={!selectedDate}
                    >
                        <option value="">Select Time</option>
                        {availableTimes.map(t => (
                            <option key={t.id} value={t.id}>{t.time}</option>
                        ))}
                    </select>
                </div>

                <button className="btn-qb" onClick={handleBook} disabled={!selectedTimeId}>
                    Book Tickets
                </button>
            </div>

            {showSeatMap && selectedShowtime && (
                <div className="modal-overlay" onClick={() => setShowSeatMap(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '10000px', width: '95%' }}>
                        <button className="close-btn" onClick={() => setShowSeatMap(false)}>×</button>
                        <div className="modal-body" style={{ padding: '0', marginTop: '0', display: 'block' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid #333', background: '#111' }}>
                                <h2 style={{ margin: 0, color: '#fff' }}>{selectedMovie.title}</h2>
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

export default QuickBooking;
