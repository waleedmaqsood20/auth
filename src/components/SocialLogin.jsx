import React from 'react';

const SocialLogin = () => {
  const iconStyle = {
    width: '30px', // Adjust the width
    height: '30px', // Adjust the height
    objectFit: 'contain', // Ensure the aspect ratio is preserved
  };

  return (
    <div className="social-login">
      <p>Sign up with:</p>
      <div className="social-icons">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/facebook.png" alt="Facebook" style={iconStyle} />
        </a>
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
