import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className = "nav-bar">
      <div class="nav-button">Nearby</div>
      <div class="nav-button">Progress</div>
      <div class="nav-button">Filter</div>
      <div class="nav-button">Logout</div>
    </div>
  );
};

export default NavBar;
