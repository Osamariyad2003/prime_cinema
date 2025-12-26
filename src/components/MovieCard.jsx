import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div
            className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group"
            tabIndex={0}
            onClick={() => onClick(movie)}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onClick(movie);
            }}
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'}
                    alt={movie.title}
                    loading="lazy"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'; }}
                />
                {!movie.isReleased && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow uppercase z-10">
                        COMING SOON
                    </div>
                )}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                    <button
                        className="bg-red-600 text-white font-bold uppercase rounded px-4 py-2 text-xs shadow hover:bg-red-700 focus:bg-red-700 transition"
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
            <div className="p-4">
                <h3 className="text-white text-base font-bold mb-1 truncate">{movie.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{movie.genre || 'General'}</span>
                    <span>•</span>
                    <span>{movie.durationMinutes} min</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
