import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

const MovieCarousel = ({ title, movies, onMovieClick, id }) => {
    const scrollContainer = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollContainer;
        if (current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="carousel-section container" id={id}>
            <div className="carousel-header">
                <h2 className="section-title">{title}</h2>
                <div className="carousel-nav">
                    <button className="nav-btn prev" onClick={() => scroll('left')}>&#8592;</button>
                    <button className="nav-btn next" onClick={() => scroll('right')}>&#8594;</button>
                </div>
            </div>

            <div className="carousel-container" ref={scrollContainer}>
                {movies.map((movie) => (
                    <div key={movie.id} className="carousel-item">
                        <MovieCard movie={movie} onClick={onMovieClick} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MovieCarousel;
