import React from "react";
import "./Waypoint.css";

// write code here to process the markers passed into App.js
const Waypoint = (props) => {
  // iterate over incoming markers, for each one create a constant with the coords, and call .addTo(map)
  // optionally create a pop up displaying the way point name

  const id = props.id.toString();
  const lat = props.lat.toString();
  const lng = props.lng.toString();
  const tagged = props.tagged.toString();
  
  // iterate over the user's tagged markers, for each one create a constant with the coords, and call .addTo(map)
  // optionally create a pop up displaying the way point name
  

  return (
      <div className="waypoint-info">
        <div className="waypoint-info__id">{id}</div>
        <div className="waypoint-info__lat">{lat}</div>
        <div className="waypoint-info__lng">{lng}</div>
        <div className="waypoint-info__tagged">{tagged}</div>
      </div>
    );
};

export default Waypoint;
