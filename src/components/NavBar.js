import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className = "nav-bar">
      <div className="nav-button">Nearby</div>
      <div className="nav-button">Progress</div>
      <div className="nav-button">Filter</div>
      <div className="nav-button">Logout</div>
    </div>
  );
};

export default NavBar;
