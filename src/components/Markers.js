import React from "react";
import "./Markers.css";

// write code here to process the markers passed into App.js
const Markers = (props) => {
  // iterate over incoming markers, for each one create a constant with the coords, and call .addTo(map)
  // optionally create a pop up displaying the way point name

  // iterate over the user's tagged markers, for each one create a constant with the coords, and call .addTo(map)
  // optionally create a pop up displaying the way point name
  

  return (
      <div>
        <Markers items = { props.markers } />
        {/* not entirely sure what happens here yet */}
      </div>
    );
};

export default Markers;
