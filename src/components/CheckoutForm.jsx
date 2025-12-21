import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

const CheckoutForm = ({ amount, onSuccess, onCancel, movieTitle, seats }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        // Mocking the payment intent creation and payment confirmation
        // In a real app, you would:
        // 1. Send amount/currency to your backend
        // 2. Receive a clientSecret from Stripe
        // 3. call stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement) } })

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
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
        <form onSubmit={handleSubmit} className="stripe-checkout-form">
            <div className="payment-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                    <span>Movie:</span>
                    <span>{movieTitle}</span>
                </div>
                <div className="summary-row">
                    <span>Seats:</span>
                    <span>{seats?.join(', ')}</span>
                </div>
                <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>${amount.toFixed(2)}</span>
                </div>
            </div>

            <div className="card-input-container">
                <label>Card Details</label>
                <div className="card-element-wrapper">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#ffffff',
                                    fontFamily: 'Montserrat, sans-serif',
                                    '::placeholder': {
                                        color: '#888888',
                                    },
                                },
                                invalid: {
                                    color: '#e50914',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {error && <div className="payment-error">{error}</div>}

            <div className="payment-actions">
                <button type="button" className="btn-cancel" onClick={onCancel} disabled={processing}>
                    Back to Seats
                </button>
                <button type="submit" className="btn-pay" disabled={!stripe || processing}>
                    {processing ? <div className="spinner"></div> : `Pay $${amount.toFixed(2)}`}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
