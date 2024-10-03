import React, { useState } from 'react';

const SubscribeForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing with:', { email, plan });
    // After successful subscription, you might want to close the form or show a success message
    onClose();
  };

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <input
        type="text"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        placeholder="Enter plan name"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscribeForm;