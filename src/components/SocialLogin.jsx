import React from 'react';
import FacebookLogin from './FacebookLogin'; // Ensure this is correct

const SocialLogin = () => {
  const iconStyle = {
    width: '30px', // Adjust the width
    height: '30px', // Adjust the height
    objectFit: 'contain', // Ensure the aspect ratio is preserved
  };

  const handleFacebookLogin = (response) => {
    if (response.authResponse) {
      console.log('Welcome! Fetching your information....');
      window.FB.api('/me', { fields: 'name,email' }, (response) => {
        console.log('Good to see you, ' + response.name + '.');
        // Handle user information, like sending it to your backend
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  };

  return (
    <div className="social-login">
      <p>Sign up with:</p>
      <div className="social-icons">
        <FacebookLogin onLogin={handleFacebookLogin} /> {/* Using the FacebookLogin component */}
        <a href="https://accounts.google.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/search.png" alt="Google" style={iconStyle} />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/social.png" alt="Twitter" style={iconStyle} />
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/github.png" alt="GitHub" style={iconStyle} />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
