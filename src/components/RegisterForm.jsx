import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import SocialLogin from './SocialLogin';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('signIn');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    terms: false,
    userId: '',
    plan: '',
  });

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      terms: false,
      userId: '',
      plan: '',
    });
  };

  useEffect(() => {
    resetFormData();
  }, [activeForm]);

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (activeForm === 'signIn') {
      if (!formData.email.trim()) errors.push('Email is required');
      if (!formData.password.trim()) errors.push('Password is required');
    } else if (activeForm === 'signUp') {
      if (!formData.username.trim()) errors.push('Name is required');
      if (!formData.email.trim()) errors.push('Email is required');
      if (!formData.password.trim()) errors.push('Password is required');
      if (!formData.confirmPassword.trim()) errors.push('Confirm Password is required');
      if (!formData.terms) errors.push('You must agree to the terms and conditions');
      if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match');
    } else if (activeForm === 'subscribe') {
      if (!formData.userId.trim()) errors.push('User ID is required');
      if (!formData.plan.trim()) errors.push('Plan is required');
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if ((activeForm === 'signIn' || activeForm === 'signUp') && formData.password && formData.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Submitting form: ${activeForm}`);
    console.log('Form Data:', formData);

    const errors = validateForm();

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    try {
      setLoading(true);

      if (activeForm === 'signIn') {
        console.log('Attempting Sign In...');
        const response = await axios.post('http://localhost:3000/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log('Sign In Successful:', response.data);
        alert('Sign In Successful');
        navigate('/pricing');

      } else if (activeForm === 'signUp') {
        console.log('Attempting Sign Up...');
        const response = await axios.post('http://localhost:3000/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        console.log('Sign Up Successful:', response.data);
        alert('Sign Up Successful');
        navigate('/pricing');

      } else if (activeForm === 'subscribe') {
        console.log('Attempting Subscription...');
        const response = await axios.post('http://localhost:3000/subscribe', {
          email: formData.userId,
          name: formData.plan,
        });

        console.log('Subscription Successful:', response.data);
        alert('Subscription Successful');
      }
    } catch (error) {
      console.error(`Error during ${activeForm} API call:`, error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert(`${activeForm} Failed: Unknown error occurred`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <div className="form-tabs">
        <button
          className={`tab ${activeForm === 'signIn' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('signIn')}
        >
          Sign In
        </button>
        <button
          className={`tab ${activeForm === 'signUp' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('signUp')}
        >
          Sign Up
        </button>
        <button
          className={`tab ${activeForm === 'subscribe' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('subscribe')}
        >
          Subscribe
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
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Sign In'}
            </button>
          </>
        )}

        {activeForm === 'signUp' && (
          <>
            <FormInput
              label="Name"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label>I agree with terms and conditions</label>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </>
        )}

        {activeForm === 'subscribe' && (
          <>
            <FormInput
              label="User ID"
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Plan"
              type="text"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Subscribe'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
