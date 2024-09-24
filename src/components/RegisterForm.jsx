import React, { useState } from 'react';
import axios from 'axios'; // Import axios
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeForm === 'signIn') {
      // Handle Sign In API submission
      try {
        const response = await axios.post('http://localhost:6003/api-docs/#/default/post_login', {
          email: formData.email,
          password: formData.password,
        });
        console.log('Sign In Successful:', response.data);
        alert('Sign In Successful');
      } catch (error) {
        console.error('Sign In Error:', error);
        alert('Sign In Failed');
      }
    } else if (activeForm === 'signUp') {
      // Handle Sign Up API submissions
      if (formData.terms) {
        try {
          const response = await axios.post('http://localhost:6003/api-docs/#/default/post_signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          console.log('Sign Up Successful:', response.data);
          alert('Sign Up Successful');
        } catch (error) {
          console.error('Sign Up Error:', error);
          alert('Sign Up Failed');
        }
      } else {
        alert('Please agree to the terms and conditions.');
      }
    } else if (activeForm === 'register') {
      // Handle Register API submission
      if (formData.terms) {
        try {
          const response = await axios.post('http://localhost:6003/api-docs/#/default/post_register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          console.log('Register Successful:', response.data);
          alert('Register Successful');
        } catch (error) {
          console.error('Register Error:', error);
          alert('Register Failed');
        }
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
        <SocialLogin />
        <p>or:</p>
        {activeForm === 'signIn' && (
          <>
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
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
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label>I agree with terms and conditions</label>
            </div>
            <button type="submit" className="submit-btn">Sign Up</button>
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
