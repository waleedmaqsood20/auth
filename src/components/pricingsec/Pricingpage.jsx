import React, { useEffect, useState } from 'react';
import PricingCard from './PricingCard';
import { loadStripe } from '@stripe/stripe-js';
import './PricingPage.css';

const stripePromise = loadStripe('pk_test_51Q9tqf2Lech7JDN5G61NSRi2BOzwckbmxwrPRhPyckK6MX2Anu9hYSQn2uFCFepm1DvIJEnrWbrBEvXL5n0Gb52q00KCigJpLT');

const PricingPage = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pricing-plans');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPricingPlans(data);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  const handleChoosePlan = async (priceId) => {
    try {
      const response = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }), // Send the correct ID
      });

      const session = await response.json();
      if (session.id) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        console.error('Error creating checkout session:', session.error || 'No session ID returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (loading) {
    return <div>Loading pricing plans...</div>;
  }

  return (
    <div className="pricing-page">
      <h1>Pricing Plans</h1>
      {pricingPlans.length === 0 ? (
        <div>No pricing plans available.</div>
      ) : (
        <div className="pricing-cards">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index} 
              name={plan.name} 
              price={plan.price} 
              features={plan.features} 
              onChoose={() => handleChoosePlan(plan.priceId)} // Ensure priceId is used
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingPage;
