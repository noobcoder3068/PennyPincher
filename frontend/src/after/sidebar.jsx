import React from "react";
import { NavLink } from "react-router-dom";
import "./sidbar.css";

function SideBar({ user_id }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar2">
        <div className="sidebar-title">
          <p>GET THE</p>
        </div>
        <ul className="sidebar-list">
          <li>
            <NavLink to={`/${user_id}/Display`} className="sidebar-link">DATA</NavLink>
          </li>
          <li>
            <NavLink to={`/${user_id}/Display/Charts`} className="sidebar-link">CHARTS</NavLink>
          </li>
          <li>
            <NavLink to={`/${user_id}/Display/FeedBack`} className="sidebar-link">FEEDBACK</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
