import React, { useState } from 'react';
import SeatSelection from './SeatSelection';
import AuthSelection from './AuthSelection';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../config/stripe';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './BookingFlow.css';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BookingFlow = ({ showtime, onBack, onComplete }) => {
    const [step, setStep] = useState('seats'); // 'seats', 'auth', 'payment', 'success'
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isGuest, setIsGuest] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    // Steps configuration
    const steps = [
        { id: 'seats', label: 'Select Seats' },
        { id: 'auth', label: 'Sign In / Guest' },
        { id: 'payment', label: 'Payment' }
    ];

    const handleSeatsConfirmed = (seats) => {
        setSelectedSeats(seats);
        if (user) {
            setStep('payment');
        } else {
            setStep('auth');
        }
    };

    const handleGuestCheckout = () => {
        setIsGuest(true);
        setStep('payment');
    };

    const handleLoginRedirect = () => {
        navigate('/login', { state: { returnTo: '/showtimes' } });
    };

    const handlePaymentSuccess = () => {
        setStep('success');
        // Here you would typically save booking to backend
    };

    const calculateTotal = () => {
        return selectedSeats.length * (showtime?.price || 12.50);
    };

    return (
        <div className="booking-flow-container">
            {/* Progress Bar */}
            <div className="booking-progress">
                {steps.map((s, index) => {
                    const isActive = s.id === step;
                    const isCompleted = steps.findIndex(x => x.id === step) > index;
                    return (
                        <div key={s.id} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                            <div className="step-circle">{isCompleted ? '✓' : index + 1}</div>
                            <span className="step-label">{s.label}</span>
                            {index < steps.length - 1 && <div className="step-line"></div>}
                        </div>
                    );
                })}
            </div>

            <div className="booking-content">
                {step === 'seats' && (
                    <SeatSelection
                        showtime={showtime}
                        onConfirm={handleSeatsConfirmed}
                        onBack={onBack}
                    />
                )}

                {step === 'auth' && (
                    <AuthSelection
                        onGuest={handleGuestCheckout}
                        onLogin={handleLoginRedirect}
                    />
                )}

                {step === 'payment' && (
                    <div className="payment-step-container">
                        <div className="payment-modal-wrapper">
                            <h2 className="section-title">Secure Payment</h2>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    amount={calculateTotal()}
                                    movieTitle={showtime?.movieTitle || "Movie Ticket"}
                                    seats={selectedSeats}
                                    onSuccess={handlePaymentSuccess}
                                    onCancel={() => setStep(user ? 'seats' : 'auth')}
                                    isGuest={isGuest}
                                />
                            </Elements>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="success-message fade-in">
                        <div className="success-icon">✓</div>
                        <h2>Booking Confirmed!</h2>
                        <p>Enjoy the movie. Your tickets have been sent to your email.</p>
                        <button className="btn btn-primary" onClick={() => {
                            if (onComplete) onComplete();
                            else navigate('/dashboard');
                        }}>
                            {onComplete ? 'Close' : 'Go to Dashboard'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingFlow;
