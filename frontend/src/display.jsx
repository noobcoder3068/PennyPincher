import React from 'react';
import './display.css';
import AddGet from './after/AddGet';
import Charts from './after/Graphical';
import Feedback from './after/Feedback';
import SideBar from './after/sidebar';
import { Routes, Route} from 'react-router-dom';

const Display = () => {

  return (
    <div className="display-container">
      <SideBar />
      <div className="display-content">
        <Routes>
          <Route path="/" element={<AddGet/>} />
          <Route path="/Charts" element={<Charts />} />
          <Route path="/FeedBack" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
};

export default Display;
