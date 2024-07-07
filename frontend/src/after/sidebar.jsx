import React from "react";
import { NavLink } from "react-router-dom";
import "./sidbar.css";

function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-title">
          <p>GET THE</p>
        </div>
        <ul className="sidebar-list">
          <li>
            <NavLink to="SignIn/Display" className="sidebar-link">DATA</NavLink>
          </li>
          <li>
            <NavLink to="SignIn/Charts" className="sidebar-link">CHARTS</NavLink>
          </li>
          <li>
            <NavLink to="SignIn/FeedBack" className="sidebar-link">FEEDBACK</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
