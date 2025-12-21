import React, { useState, useEffect } from 'react';
import './SeatSelection.css';

const SeatSelection = ({ showtime, onConfirm, onBack }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    const rows = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const vRow = 'V';

    useEffect(() => {
        // Mocking seat data for the grid based on the image
        // In a real app, this would fetch from the backend
        const generateMockSeats = () => {
            const mockSeats = [];

            // Rows A-K
            rows.forEach(row => {
                for (let col = 22; col >= 1; col--) {
                    mockSeats.push({
                        id: `${row}${col}`,
                        row: row,
                        column: col,
                        seatNumber: `${row}${col}`,
                        isBooked: Math.random() < 0.1, // Randomly mark some as sold
                        type: 'standard'
                    });
                }
            });

            // Row V
            for (let col = 10; col >= 1; col--) {
                mockSeats.push({
                    id: `V${col}`,
                    row: 'V',
                    column: col,
                    seatNumber: `${col}`,
                    isBooked: Math.random() < 0.05,
                    type: 'vip'
                });
            }

            // Force some "Sold" seats as seen in the image (F11, F12)
            const f11 = mockSeats.find(s => s.id === 'F11');
            const f12 = mockSeats.find(s => s.id === 'F12');
            if (f11) f11.isBooked = true;
            if (f12) f12.isBooked = true;

            setSeats(mockSeats);
            setLoading(false);
        };

        generateMockSeats();
    }, []);

    const toggleSeat = (seatId) => {
        const seat = seats.find(s => s.id === seatId);
        if (seat.isBooked) return;

        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const calculateTotal = () => {
        return selectedSeats.length * (showtime?.price || 10);
    };

    if (loading) return <div className="loading">Loading seat map...</div>;

    return (
        <div className="seat-selection-container">
            <div className="seat-legend">
                <div className="legend-item">
                    <div className="legend-box your-seat"></div>
                    <span>Your seat</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box available"></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box sold"></div>
                    <span>Sold</span>
                </div>
            </div>

            <div className="screen-container">
                <div className="screen-bar"></div>
                <div className="screen-text">Screen</div>
            </div>

            <div className="seats-grid">
                {/* Render Rows A-K */}
                {rows.map(row => (
                    <div key={row} className="seat-row">
                        <span className="row-label">{row}</span>
                        {seats.filter(s => s.row === row).map(seat => (
                            <div
                                key={seat.id}
                                className={`seat ${seat.isBooked ? 'sold' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                                onClick={() => toggleSeat(seat.id)}
                            >
                                {seat.column}
                            </div>
                        ))}
                        <span className="row-label">{row}</span>
                    </div>
                ))}

                {/* Render Row V */}
                <div className="seat-row row-v">
                    <span className="row-label">V</span>
                    {seats.filter(s => s.row === 'V').map(seat => (
                        <div
                            key={seat.id}
                            className={`seat ${seat.isBooked ? 'sold' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                            onClick={() => toggleSeat(seat.id)}
                        >
                            {seat.column}
                        </div>
                    ))}
                    <span className="row-label">V</span>
                </div>
            </div>

            <div className="booking-footer">
                <div className="selected-info">
                    <h4>Selected Seats</h4>
                    <div className="selected-seats-list">
                        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                    </div>
                </div>
                <div className="pricing-info">
                    <h4>Total Price</h4>
                    <div className="total-price">${calculateTotal().toFixed(2)}</div>
                </div>
                <div className="actions">
                    <button className="btn btn-outline" onClick={onBack} style={{ marginRight: '15px' }}>Back</button>
                    <button
                        className="confirm-booking-btn"
                        disabled={selectedSeats.length === 0}
                        onClick={() => onConfirm(selectedSeats)}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
