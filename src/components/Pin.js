import React, { useEffect } from "react";
import brandedMarker from "./mapbox-marker-branded.svg";
import mutedBrandedMarker from "./mapbox-marker-branded-muted.svg";

const Pin = ({ location }) => {
  useEffect(() => {
  }, [location.collected]);
  return (
    <div className="pin">
      {/* styles adjusted to enlarge map pins with margins compensated */}
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
