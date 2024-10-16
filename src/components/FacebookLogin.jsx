import React, { useEffect } from 'react';

const FacebookLogin = ({ onLogin }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '481312801571526', // Replace with your App ID
        cookie: true,
        xfbml: true,
        version: 'v12.0', // Replace with the API version you want to use
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleLogin = () => {
    window.FB.login((response) => {
      if (response.status === 'connected') {
        onLogin(response); // Call the onLogin prop with the response
      } else {
        console.error('Facebook login failed');
      }
    }, { scope: 'email' }); // Request email permission
  };

  return (
    <a href="#" onClick={(e) => { e.preventDefault(); handleLogin(); }}>
      <img src="/images/facebook.png" alt="Facebook" style={{ width: '30px', height: '30px' }} />
    </a>
  );
};

export default FacebookLogin;
