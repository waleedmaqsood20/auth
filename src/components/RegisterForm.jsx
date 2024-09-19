import React, { useState } from 'react';
import FormInput from './FormInput';
import SocialLogin from './SocialLogin';

const RegisterForm = () => {
  const [activeForm, setActiveForm] = useState('signIn'); // Tracks the active form (signIn, signUp, register)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeForm === 'signIn') {
      // Handle Sign In API submission
      console.log('Sign In data:', formData);
    } else if (activeForm === 'signUp') {
      // Handle Sign Up API submission
      if (formData.terms) {
        console.log('Sign Up data:', formData);
      } else {
        alert('Please agree to the terms and conditions.');
      }
    } else if (activeForm === 'register') {
      // Handle Register API submission
      if (formData.terms) {
        console.log('Register data:', formData);
      } else {
        alert('Please agree to the terms and conditions.');
      }
    }
  };

  return (
    <div className="register-form">
      <div className="form-tabs">
        <button
          className={`tab ${activeForm === 'signIn' ? 'active' : ''}`}
          onClick={() => setActiveForm('signIn')}
        >
          Sign In
        </button>
        <button
          className={`tab ${activeForm === 'signUp' ? 'active' : ''}`}
          onClick={() => setActiveForm('signUp')}
        >
          Sign Up
        </button>
        <button
          className={`tab ${activeForm === 'register' ? 'active' : ''}`}
          onClick={() => setActiveForm('register')}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Add SocialLogin component to render social login icons */}
        <SocialLogin />  
        <p>or:</p>
        </form>

      <form onSubmit={handleSubmit}>
        {activeForm === 'signIn' && (
          <>
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label>Remember Me</label>
            </div>
            <p className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <button type="submit" className="submit-btn">Sign In</button>
          </>
        )}

        {activeForm === 'signUp' && (
          <>
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label>I agree with terms and conditions</label>
            </div>
            <button type="submit" className="submit-btn">Subscribe</button>
          </>
        )}

        {activeForm === 'register' && (
          <>
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label>I agree with terms and conditions</label>
            </div>
            <button type="submit" className="submit-btn">Register</button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
