import React from "react";
import Pin from "./Pin";
import { Marker } from "react-map-gl";

const Markers = ({
  locations,
  setSelectedLocation,
}) => {

  // 30Mar23: Mukund added the following map function for testing only:
//  locations.map((location, index) => (
//    console.log(`Inside <Markers/> and json string of location is: ${JSON.stringify(location)} and index is: ${index}`)
//  ))

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
