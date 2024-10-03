// src/components/PricingCard.jsx
import React from 'react';

const PricingCard = ({ name, price, features }) => {
  return (
    <div className="pricing-card">
      <h2>{name} Plan</h2>
      <h3>${price.toFixed(2)}</h3>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button>Choose {name}</button>
    </div>
  );
};

export default PricingCard;
