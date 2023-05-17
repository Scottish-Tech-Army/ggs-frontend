import React from "react";
// The 100% opaque blue marker:
import brandedMarker from "../assets/images/markerActive.svg";
// The faded blue marker:
import mutedBrandedMarker from "../assets/images/markerMuted.svg";

// Old images:
// import brandedMarker from "./mapbox-marker-branded.svg";
// import mutedBrandedMarker from "./mapbox-marker-branded-muted.svg";



const Pin = ({ location }) => {

  // styles adjusted to enlarge map pins with margins compensated 
  return (
    <div className="pin">
      <img
        src={location.collected ? mutedBrandedMarker : brandedMarker}
        alt="map pin"
        style={{
          width: "100%",
          height: "100%",
          marginLeft: "0%",
          marginTop: "0%",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Pin;
