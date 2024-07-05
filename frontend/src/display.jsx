import React from 'react';
import './display.css';
import AddGet from './after/AddGet';
import { useLocation } from 'react-router-dom';

const Display = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const user_id = user.id;

  return (
    <div className="welcome-container">
      <h1>Welcome Back, Master!</h1>
      <p className="user-details">
        <strong>Name:</strong> {user.username} <br />
        <strong>Email:</strong> {user.email} <br />
        <strong>Last Login:</strong> 
      </p>
      <AddGet user_id={user_id} />
    </div>
  );
};

export default Display;
