import React from 'react';
import './display.css';
import AddExpanse from './after/AddExpanse';
import ShowInfo from './after/ShowInfo';
import { useLocation } from 'react-router-dom';

const Display = () => {

  const location= useLocation();
  const {user} = location.state || {};
  const user_id= user.id;

  return (
    <div className="welcome-container">
      <h1>Welcome Back, Master!</h1>
      <p className="user-details">
        <strong>Name:</strong>{user.username} <br />
        <strong>Email:</strong> {user.id} <br />
        <strong>Last Login:</strong> 
      </p>
      <AddExpanse user_id={user_id}/>
      <ShowInfo user_id={user_id}/>
    </div>
  );
};

export default Display;
