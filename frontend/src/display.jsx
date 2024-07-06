import React from 'react';
import AddGet from './after/AddGet';
import Charts from './after/Graphical';
import Feedback from './after/Feedback';
import SideBar from './after/sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';

const Display = () => {
  const location = useLocation();
  const {user} = location.state ;
  const user_id = user?.id;

  if (!user_id) {
    console.error('Invalid user_id:', user_id);
    return <div>Error: Invalid user ID</div>;
  }

  return (
    <div className="display-container">
      <SideBar />
      <div className="display-content">
        <Routes>
          <Route path="/" element={<AddGet user_id={user_id} />} />
          <Route path="Charts" element={<Charts />} />
          <Route path="FeedBack" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
};

export default Display;
