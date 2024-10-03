// src/components/PricingPage.jsx
import React, { useEffect, useState } from 'react';
import PricingCard from './PricingCard';
import './PricingPage.css'; 

const PricingPage = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pricing-plans');
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

  if (loading) {
    return <div>Loading pricing plans...</div>;
  }

  return (
    <div className="pricing-page">
      <h1>Pricing Plans</h1>
      <div className="pricing-cards">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} name={plan.name} price={plan.price} features={plan.features} />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
