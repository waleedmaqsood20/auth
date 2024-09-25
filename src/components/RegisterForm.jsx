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
    
    console.log(`Submitting form: ${activeForm}`);  // Log which form is being submitted
    console.log('Form Data:', formData);  // Log form data for debugging
    
    try {
      if (activeForm === 'signIn') {
        // Log API call attempt
        console.log('Attempting Sign In...');

        const response = await axios.post('http://localhost:5009/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log('Sign In Successful:', response.data);  // Log success
        alert('Sign In Successful');
      } else if (activeForm === 'signUp') {
        if (formData.terms) {
          // Log API call attempt
          console.log('Attempting Sign Up...');

          const response = await axios.post('http://localhost:6002/api-docs/#/default/post_signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });

          console.log('Sign Up Successful:', response.data);  // Log success
          alert('Sign Up Successful');
        } else {
          alert('Please agree to the terms and conditions.');
        }
      } else if (activeForm === 'register') {
        if (formData.terms) {
          // Log API call attempt
          console.log('Attempting Registration...');

          const response = await axios.post('http://localhost:5009/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });

          console.log('Register Successful:', response.data);  // Log success
          alert('Register Successful');
        } else {
          alert('Please agree to the terms and conditions.');
        }
      }
    } catch (error) {
      console.error(`Error during ${activeForm} API call:`, error);  // Log error with form type
      alert(`${activeForm} Failed`);
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
