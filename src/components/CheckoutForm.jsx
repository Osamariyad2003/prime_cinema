import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createBooking } from '../services/api';
import './CheckoutForm.css';

// The backend's booking contract is one-seat-per-booking: creating a booking reserves the seat
// and returns a Stripe PaymentIntent client secret, which must then be confirmed with the card
// details to actually charge it. For a multi-seat purchase we do this seat-by-seat, reusing the
// same CardElement for each confirmCardPayment call. There is no bulk/atomic endpoint, so a
// failure partway through can leave earlier seats booked-and-paid while a later one fails — we
// surface exactly which seats succeeded so the user (and support, via the booking IDs) isn't left
// guessing what they were actually charged for.
const CheckoutForm = ({ amount, onSuccess, onCancel, movieTitle, seats, isGuest, showtimeId, token }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!stripe || !elements) {
            setError('Payment is currently unavailable. Please try again later or contact support.');
            return;
        }

        if (isGuest && !email) {
            setError('Please provide an email address for your tickets.');
            return;
        }

        if (!seats || seats.length === 0) {
            setError('No seats selected.');
            return;
        }

        setProcessing(true);

        const cardElement = elements.getElement(CardElement);
        const confirmedBookings = [];

        try {
            for (const seat of seats) {
                let booking, clientSecret;
                try {
                    ({ booking, clientSecret } = await createBooking(
                        {
                            showtimeId,
                            seatId: seat.id,
                            ...(isGuest && email ? { guestEmail: email } : {}),
                        },
                        token
                    ));
                } catch (bookingError) {
                    throw new Error(
                        confirmedBookings.length > 0
                            ? `Seat ${seat.label} could not be reserved (${bookingError.message}). Seats already confirmed and charged: ${confirmedBookings.map(b => b.seat?.label).join(', ')} — please contact support with booking ID(s) ${confirmedBookings.map(b => b.booking.id).join(', ')}.`
                            : `Seat ${seat.label} could not be reserved: ${bookingError.message}`
                    );
                }

                const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: { email: isGuest ? email : undefined },
                    },
                });

                if (confirmError) {
                    throw new Error(
                        confirmedBookings.length > 0
                            ? `Payment failed for seat ${seat.label} (${confirmError.message}). Seats already confirmed and charged: ${confirmedBookings.map(b => b.seat?.label).join(', ')} — please contact support with booking ID(s) ${confirmedBookings.map(b => b.booking.id).join(', ')}.`
                            : `Payment failed for seat ${seat.label}: ${confirmError.message}`
                    );
                }

                confirmedBookings.push({ booking, seat });
            }

            onSuccess(confirmedBookings.map(b => b.booking));
        } catch (err) {
            setError(err.message || 'We could not complete your booking. Please try again or contact support.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-checkout-form fade-in">
            <div className="payment-summary">
                <div className="summary-row">
                    <span>Movie</span>
                    <strong>{movieTitle}</strong>
                </div>
                <div className="summary-row">
                    <span>Seats</span>
                    <strong>{seats?.map(s => s.label).join(', ')}</strong>
                </div>
                <div className="summary-row total">
                    <span>Total</span>
                    <strong className="text-red">${amount.toFixed(2)}</strong>
                </div>
            </div>

            {isGuest && (
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        required
                        placeholder="For your tickets"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="guest-email-input"
                    />
                </div>
            )}

            <div className="card-input-container">
                <label>Card Details</label>
                <div className="card-element-wrapper">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#ffffff',
                                    fontFamily: "'Outfit', sans-serif",
                                    '::placeholder': {
                                        color: '#666',
                                    },
                                    iconColor: '#E50914'
                                },
                                invalid: {
                                    color: '#ff4444',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {error && <div className="payment-error">{error}</div>}

            <div className="payment-actions">
                <button type="button" className="btn-cancel" onClick={onCancel} disabled={processing}>
                    Back
                </button>
                <button type="submit" className="btn-pay" disabled={!stripe || processing}>
                    {processing ? <div className="spinner"></div> : `PAY $${amount.toFixed(2)}`}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
