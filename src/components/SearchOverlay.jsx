import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../services/api';
import './SearchOverlay.css';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [allMovies, setAllMovies] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            const data = await fetchMovies();
            setAllMovies(data);
        };
        if (isOpen && allMovies.length === 0) {
            loadMovies();
        }
    }, [isOpen, allMovies.length]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = allMovies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.genre?.some(g => g.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered);
    }, [query, allMovies]);

    if (!isOpen) return null;

    return (
        <div className="search-overlay fade-in">
            <button className="close-btn" onClick={onClose}>&times;</button>
            <div className="search-container container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search movies, genres, experiences..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />

                <div className="search-results">
                    {results.length > 0 ? (
                        results.map(movie => (
                            <Link to={`/prime_cinema/movies?id=${movie.id}`} key={movie.id} onClick={onClose} className="search-result-item">
                                <img src={movie.poster} alt={movie.title} className="result-poster" />
                                <div className="result-info">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.genre?.join(', ')}</p>
                                </div>
                            </Link>
                        ))
                    ) : query.length > 0 ? (
                        <p className="no-results">No matches found for "{query}"</p>
                    ) : (
                        <p className="search-hint">Start typing to explore...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
