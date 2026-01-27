import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div
            className="movie-card"
            tabIndex={0}
            onClick={() => onClick(movie)}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onClick(movie);
            }}
        >
            <div className="movie-poster">
                <img
                    src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'}
                    alt={movie.title}
                    loading="lazy"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'; }}
                />
                {!movie.isReleased && (
                    <div className="coming-soon-ribbon">
                        COMING SOON
                    </div>
                )}
                <div className="movie-overlay">
                    <button
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                        tabIndex={0}
                        aria-label={movie.isReleased ? `Book tickets for ${movie.title}` : `Watch trailer for ${movie.title}`}
                        onClick={e => {
                            e.stopPropagation();
                            onClick(movie);
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation();
                                onClick(movie);
                            }
                        }}
                    >
                        {movie.isReleased ? 'Book Now' : 'Watch Trailer'}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                    <span>{movie.genre || 'General'}</span>
                    <span>•</span>
                    <span>{movie.durationMinutes} min</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
