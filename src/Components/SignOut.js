import React, { useEffect } from 'react';
import Footer from './Footer';

const SignOut = () => {
  useEffect(() => {
    sessionStorage.clear();
    alert('You have been signed out.');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000); 
  }, []);

  return (
    <div>
      <h2>Sign Out Page</h2>
      <p>You have been signed out. Redirecting to the login page...</p>
      <Footer />
    </div>
  );
};

export default SignOut;
