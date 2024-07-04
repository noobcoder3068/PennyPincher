import React from 'react';
import './display.css';

const Display = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome Back, Master!</h1>
      <p className="user-details">
        <strong>Name:</strong> <br />
        <strong>Email:</strong>  <br />
        <strong>Last Login:</strong> 
      </p>
    </div>
  );
};

export default Display;
