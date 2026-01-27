import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

const CheckoutForm = ({ amount, onSuccess, onCancel, movieTitle, seats, isGuest }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (isGuest && !email) {
            setError('Please provide an email address for your tickets.');
            return;
        }

        setProcessing(true);

        // Mocking the payment intent creation and payment confirmation
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: isGuest ? email : undefined,
            }
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Simulate network delay
            setTimeout(() => {
                setProcessing(false);
                onSuccess(paymentMethod.id);
            }, 2000);
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
                    <strong>{seats?.join(', ')}</strong>
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
