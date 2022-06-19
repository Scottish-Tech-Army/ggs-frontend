import React from "react";
import brandedMarker from "./mapbox-marker-branded.svg";
import mutedBrandedMarker from "./mapbox-marker-branded-muted.svg";

const Pin = ({ location }) => {

  // styles adjusted to enlarge map pins with margins compensated 
  return (
    <div className="pin">
      <img
        src={location.collected ? mutedBrandedMarker : brandedMarker}
        alt="map pin"
        style={{
          width: "150%",
          height: "150%",
          marginLeft: "-50%",
          marginTop: "-50%",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Pin;
