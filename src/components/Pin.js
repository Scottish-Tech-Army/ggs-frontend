import React from "react";
import brandedMarker from "./mapbox-marker-branded.svg";

const Pin = () => {
  return (
    <div className="pin">
      {/* styles adjusted to enlarge map pins with margins compensated */}
      <img src={brandedMarker} alt="map pin" style={{width:"150%", height:"150%", marginLeft: "-50%", marginTop: "-50%"}}/>
    </div>
  );
};

export default Pin;
