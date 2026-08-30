import React, { useState, useEffect, useCallback } from 'react';
import { fetchShowtimeSeats } from '../services/api';
import './SeatSelection.css';

const SeatSelection = ({ showtime, onConfirm, onBack }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadSeats = useCallback(async () => {
        if (!showtime?.id) {
            setError('No showtime selected.');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await fetchShowtimeSeats(showtime.id);
            setSeats(data.seats || []);
        } catch {
            setError('Could not load seat availability. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [showtime?.id]);

    useEffect(() => {
        loadSeats();
    }, [loadSeats]);

    const rows = [...new Set(seats.map(s => s.row))].sort();

    const toggleSeat = (seat) => {
        if (seat.status !== 'available') return;

        setSelectedSeats(prev =>
            prev.some(s => s.id === seat.id)
                ? prev.filter(s => s.id !== seat.id)
                : [...prev, seat]
        );
    };

    const calculateTotal = () => {
        return selectedSeats.length * (showtime?.price || 12.50);
    };

    if (loading) return <div className="loading-seats">Loading Cinema Map...</div>;

    if (error) {
        return (
            <div className="loading-seats">
                {error}
                <div style={{ marginTop: '16px' }}>
                    <button className="confirm-booking-btn" onClick={loadSeats}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="seat-selection-container fade-in">
            <div className="seat-map-wrapper">
                <div className="screen-container">
                    <div className="screen-bar"></div>
                    <div className="screen-text">Screen</div>
                </div>

                <div className="seats-scroll-container">
                    <div className="seats-grid">
                        {rows.map(row => (
                            <div key={row} className="seat-row">
                                <span className="row-label">{row}</span>
                                {seats
                                    .filter(s => s.row === row)
                                    .sort((a, b) => a.col - b.col)
                                    .map(seat => {
                                        const isSold = seat.status !== 'available';
                                        const isSelected = selectedSeats.some(s => s.id === seat.id);
                                        return (
                                            <div
                                                key={seat.id}
                                                role="button"
                                                tabIndex={isSold ? -1 : 0}
                                                aria-disabled={isSold}
                                                aria-pressed={isSelected}
                                                aria-label={`Seat ${seat.label}${isSold ? ', sold' : isSelected ? ', selected' : ', available'}${seat.type && seat.type !== 'Standard' ? `, ${seat.type}` : ''}`}
                                                className={`seat ${seat.type === 'Wheelchair' ? 'seat-vip' : ''} ${isSold ? 'sold' : ''} ${isSelected ? 'selected' : ''}`}
                                                onClick={() => toggleSeat(seat)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        toggleSeat(seat);
                                                    }
                                                }}
                                                title={seat.label}
                                            ></div>
                                        );
                                    })}
                                <span className="row-label">{row}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="seat-legend">
                <div className="legend-item"><div className="legend-box available"></div> <span>Available</span></div>
                <div className="legend-item"><div className="legend-box selected"></div> <span>Selected</span></div>
                <div className="legend-item"><div className="legend-box sold"></div> <span>Sold</span></div>
            </div>

            <div className="booking-footer">
                <div className="selected-info">
                    <span className="info-label">Selected</span>
                    <span className="info-value">{selectedSeats.length > 0 ? selectedSeats.map(s => s.label).join(', ') : 'None'}</span>
                </div>
                <div className="pricing-info">
                    <span className="info-label">Total</span>
                    <span className="total-price">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="actions">
                    {onBack && (
                        <button className="back-booking-btn" onClick={onBack}>
                            Back
                        </button>
                    )}
                    <button className="confirm-booking-btn" disabled={selectedSeats.length === 0} onClick={() => onConfirm(selectedSeats)}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
