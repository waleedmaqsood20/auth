import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import FormInput from './FormInput';
import SocialLogin from './SocialLogin';

const RegisterForm = () => {
  const [activeForm, setActiveForm] = useState('signIn'); // Tracks the active form (signIn, signUp, register)
  const [loading, setLoading] = useState(false); // For disabling the button on submit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    terms: false,
  });

  // Reset form data when switching between forms
  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      terms: false,
    });
  };

  const handleFormSwitch = (form) => {
    setActiveForm(form);
    resetFormData();
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Submitting form: ${activeForm}`); // Log active form
    console.log('Form Data:', formData); // Log form data

    // Basic validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword && activeForm !== 'signIn') {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Sign In Logic
      if (activeForm === 'signIn') {
        console.log('Attempting Sign In...');
        const response = await axios.post('http://localhost:3000/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log('Sign In Successful:', response.data);
        alert('Sign In Successful');
        resetFormData(); // Clear form data after successful sign in

      // Sign Up Logic
      } else if (activeForm === 'signUp') {
        if (formData.terms) {
          console.log('Attempting Sign Up...');

          const response = await axios.post('http://localhost:3000/signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });

          console.log('Sign Up Successful:', response.data);
          alert('Sign Up Successful');
          resetFormData(); // Clear form data after successful sign up
        } else {
          alert('Please agree to the terms and conditions.');
        }

      // Register Logic
      } else if (activeForm === 'register') {
        if (formData.terms) {
          console.log('Attempting Registration...');
          const response = await axios.post('http://localhost:3000/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });

          console.log('Register Successful:', response.data);
          alert('Register Successful');
          resetFormData(); // Clear form data after successful registration
        } else {
          alert('Please agree to the terms and conditions.');
        }
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
          className={`tab ${activeForm === 'register' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('register')}
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
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
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
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Register'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
