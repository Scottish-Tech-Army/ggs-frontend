import React from "react";
import "./Markers.css";

// write code here to process the markers passed into App.js
const Markers = (props) => {
  return (
      <div>
        <Markers items = { props.markers } />
      </div>
    );
};

export default Markers;
