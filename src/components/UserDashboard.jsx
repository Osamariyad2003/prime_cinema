import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMyBookings } from '../services/api';
import './Dashboard.css';

const UserDashboard = () => {
    const { user, token, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const data = await fetchMyBookings(token);
                setBookings(data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        getBookings();
    }, [token]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="welcome-section">
                    <h1>Hello, {user?.name || 'Guest'}</h1>
                    <p>Welcome to your personal dashboard</p>
                </div>
                <button onClick={logout} className="logout-button">Logout</button>
            </header>

            <div className="dashboard-grid">
                {/* Loyalty Info */}
                <section className="dashboard-card loyalty-card-status">
                    <h3>Loyalty Status</h3>
                    <div className="loyalty-stats">
                        <div className="stat">
                            <span className="label">Points</span>
                            <span className="value">{user?.loyaltyCard?.points || 0}</span>
                        </div>
                        <div className="stat">
                            <span className="label">Tier</span>
                            <span className="value">{user?.loyaltyCard?.tier || 'Standard'}</span>
                        </div>
                    </div>
                </section>

                {/* Recent Bookings */}
                <section className="dashboard-card bookings-section">
                    <h3>Your Recent Bookings</h3>
                    {loading ? (
                        <p>Loading your tickets...</p>
                    ) : bookings.length > 0 ? (
                        <div className="bookings-list">
                            {bookings.map(booking => (
                                <div key={booking.id} className="booking-item">
                                    <div className="booking-info">
                                        <h4>{booking.showtime?.movie?.title || 'Untitled booking'}</h4>
                                        {booking.showtime?.startTime && <p>{new Date(booking.showtime.startTime).toLocaleString()}</p>}
                                        {(booking.showtime?.screen?.cinema?.cinemaName || booking.showtime?.screen?.screenName) && (
                                            <p>{booking.showtime?.screen?.cinema?.cinemaName} - {booking.showtime?.screen?.screenName}</p>
                                        )}
                                        {booking.seat?.label && <p>Seat {booking.seat.label}</p>}
                                    </div>
                                    <div className="booking-status">
                                        <span className={`badge ${booking.status === 'pending' ? 'pending' : ''}`}>
                                            {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-bookings">
                            <p>No upcoming bookings found.</p>
                            <button className="btn btn-primary" onClick={() => window.location.href = '/showtimes'}>Book a Movie</button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default UserDashboard;
