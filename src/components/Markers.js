import React from "react";
import Pin from "./Pin";
import { Marker } from "react-map-gl";

const Markers = ({
  locations,
  setSelectedLocation,
}) => {
  return (
    locations &&
    locations.map((location, index) => (
      <Marker
        key={index}
        index={index}
        marker={location}
        latitude={location.latitude}
        longitude={location.longitude}
        onClick={() => setSelectedLocation(location)}
      >
        <Pin
          location={location} // dynamically apply colour without triggering rerenders
        />
      </Marker>
    ))
  );
};

export default Markers;
