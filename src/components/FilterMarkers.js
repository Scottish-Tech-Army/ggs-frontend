import React from "react";
import "./FilterMarkers.css";

const FilterMarkers = () => {
  // set event handlers to show/hide markers
  
  return (
    <div className = "filter-modal">
      <div class="filter-button">All markers</div>
      <div class="filter-button">Tagged</div>
      <div class="filter-button">Not tagged</div>
    </div>
  );
};

export default FilterMarkers;
