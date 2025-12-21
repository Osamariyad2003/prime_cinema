import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
    // Extract unique locations from showtimes
    const locations = [...new Set(movie.showtimes?.map(s => s.screen?.cinema?.location).filter(Boolean))];
    const locationText = locations.length > 0 ? locations.join(' • ') : 'Coming Soon';

    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <div className="location-badge">
                <span className="icon">📍</span> {movie.isReleased ? locationText : `RELEASING ${movie.releaseDate || 'SOON'}`}
            </div>

            <div className="movie-poster">
                <img
                    src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'}
                    alt={movie.title}
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'}
                />
                {!movie.isReleased && <div className="coming-soon-ribbon">COMING SOON</div>}
                <div className="movie-overlay">
                    <button className="btn btn-primary">{movie.isReleased ? 'Book Now' : 'Watch Trailer'}</button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                    <span>{movie.genre || 'General'}</span>
                    <span>{movie.durationMinutes} min</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
