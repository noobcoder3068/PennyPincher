import React from "react";
import { NavLink } from "react-router-dom";
import "./sidbar.css"; 

function SideBar({ user_id }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-title">
          <p>GET THE</p>
        </div>
        <ul className="sidebar-list">
          <li>
            <NavLink to={`/Display/${user_id}`} className="sidebar-link">DATA</NavLink>
          </li>
          <li>
            <NavLink to={`/Display/${user_id}/Charts`} className="sidebar-link">CHARTS</NavLink>
          </li>
          <li>
            <NavLink to={`/Display/${user_id}/FeedBack`} className="sidebar-link">FEEDBACK</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
