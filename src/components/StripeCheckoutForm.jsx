// src/components/StripeCheckoutForm.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripeCheckoutForm.css';

const stripePromise = loadStripe('pk_test_51Q9tqf2Lech7JDN5G61NSRi2BOzwckbmxwrPRhPyckK6MX2Anu9hYSQn2uFCFepm1DvIJEnrWbrBEvXL5n0Gb52q00KCigJpLT'); // Replace with your actual publishable key

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCheckoutForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Call your backend to create the Payment Intent
      const response = await fetch('http://localhost:3000/api/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const paymentResult = await response.json();

      if (paymentResult.error) {
        setError(paymentResult.error);
        setLoading(false);
        return;
      }

      // Check if payment was successful
      if (paymentResult.clientSecret) {
        onPaymentSuccess(); // Notify parent component of successful payment
      } else {
        setError('Payment failed. Please try again.');
      }

      setLoading(false);
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      <div className="form-row">
        <label htmlFor="card-element">Credit or Debit Card</label>
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      </div>

      {error && <div className="card-error" role="alert">{error}</div>}

      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const StripeCheckout = ({ onPaymentSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
};

export default StripeCheckout;
