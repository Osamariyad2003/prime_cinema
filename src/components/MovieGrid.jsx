import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import SkeletonCard from './SkeletonCard';
import { fetchMovies } from '../services/api';
import './MovieGrid.css';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('showing'); // 'showing' or 'coming'

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchMovies();
            setMovies(data);
            setLoading(false);
        };
        loadData();
    }, []);

    // Filter movies based on active tab
    // Since backend data might not differentiate yet, we'll assume all fetched movies are "Now Showing".
    // "Coming Soon" will be empty or simulated for UI demonstration.
    // Logic for Tabs: Now Showing vs Coming Soon
    // In a real app, we'd check release Date vs today.
    // For demo using mock data, let's assume movies with IDs > 4 are "Coming Soon" or randomize it
    // Or better, filter by a 'releaseDate' field if it existed.
    // Let's split strictly for visual demonstration since the backend might not have dates yet.
    const displayedMovies = activeTab === 'showing'
        ? movies.filter(movie => movie.isReleased === true)
        : movies.filter(movie => movie.isReleased === false);

    // Memoize MovieCard for performance
    const MemoMovieCard = React.memo(MovieCard);
    const handleMovieClick = useCallback((movie) => setSelectedMovie(movie), []);

    return (
        <section className="movie-section container" id="movies">
            <div className="section-header">
                <h2 className="section-title">Cinematic Lineup</h2>
                <div className="movie-tabs" role="tablist">
                    <button
                        className={`tab-btn ${activeTab === 'showing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('showing')}
                        role="tab"
                        aria-selected={activeTab === 'showing'}
                        tabIndex={activeTab === 'showing' ? 0 : -1}
                    >
                        Now Showing
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'coming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('coming')}
                        role="tab"
                        aria-selected={activeTab === 'coming'}
                        tabIndex={activeTab === 'coming' ? 0 : -1}
                    >
                        Coming Soon
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="movie-grid">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <SkeletonCard key={n} />
                    ))}
                </div>
            ) : (
                <div className="movie-grid">
                    {displayedMovies.length > 0 ? (
                        displayedMovies.map(movie => (
                            <MemoMovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={handleMovieClick}
                            />
                        ))
                    ) : (
                        <div className="empty-state">
                            {activeTab === 'showing'
                                ? "No movies currently showing."
                                : "Stay tuned! Exciting titles are coming soon."}
                        </div>
                    )}
                </div>
            )}

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </section>
    );
};

export default MovieGrid;
