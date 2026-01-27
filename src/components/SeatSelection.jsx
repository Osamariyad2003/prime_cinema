import React, { useState, useEffect } from 'react';
import './SeatSelection.css';

const SeatSelection = ({ showtime, onConfirm, onBack }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    const rows = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

    useEffect(() => {
        // Mocking seat data
        const generateMockSeats = () => {
            const mockSeats = [];
            rows.forEach(row => {
                for (let col = 22; col >= 1; col--) {
                    mockSeats.push({
                        id: `${row}${col}`,
                        row: row,
                        column: col,
                        seatNumber: `${row}${col}`,
                        isBooked: Math.random() < 0.1,
                        type: 'standard'
                    });
                }
            });
            // Row V (VIP)
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
            setSeats(mockSeats);
            setLoading(false);
        };
        generateMockSeats();
    }, []);

    const toggleSeat = (seatId) => {
        const seat = seats.find(s => s.id === seatId);
        if (seat?.isBooked) return;

        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const calculateTotal = () => {
        return selectedSeats.length * (showtime?.price || 12.50); // Default bumped to premium price
    };

    if (loading) return <div className="loading-seats">Loading Cinema Map...</div>;

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
                                {seats.filter(s => s.row === row).map(seat => (
                                    <div
                                        key={seat.id}
                                        className={`seat ${seat.isBooked ? 'sold' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                                        onClick={() => toggleSeat(seat.id)}
                                        title={`${seat.row}${seat.column}`}
                                    ></div>
                                ))}
                                <span className="row-label">{row}</span>
                            </div>
                        ))}

                        <div className="seat-row row-v">
                            <span className="row-label">VIP</span>
                            {seats.filter(s => s.row === 'V').map(seat => (
                                <div
                                    key={seat.id}
                                    className={`seat seat-vip ${seat.isBooked ? 'sold' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                                    onClick={() => toggleSeat(seat.id)}
                                >
                                    <span style={{ fontSize: '10px' }}>{seat.column}</span>
                                </div>
                            ))}
                        </div>
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
                    <span className="info-value">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                </div>
                <div className="pricing-info">
                    <span className="info-label">Total</span>
                    <span className="total-price">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="actions">
                    <button className="confirm-booking-btn" disabled={selectedSeats.length === 0} onClick={() => onConfirm(selectedSeats)}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
