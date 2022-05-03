import React from "react";
import Pin from "./Pin";
import { Marker } from "react-map-gl";

const Markers = ({
  locations,
  setLocLng,
  setLocLat,
  handleShowLocation,
  setLocationData,
  userRangeCheck,
  setImgUrl,
  setCityName,
  MAPBOX_TOKEN
}) => {
  //const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  return (
    locations &&
    locations.map((location, index) => (
      <Marker
        key={location.id}
        index={index}
        marker={location}
        latitude={location.latitude}
        longitude={location.longitude}
        onClick={() => {
          setLocLng(location.longitude);
          setLocLat(location.latitude);
          handleShowLocation();
          setLocationData(location);
          userRangeCheck();
          if (location.photos.length > 0) {
              setImgUrl(location.photos[0].url);
              // console.log("photo: " + location.photos[0].url);
          } else {
              setImgUrl("missing");
          }
          fetch(
              "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
              location.longitude +
              "," +
              location.latitude +
              ".json?access_token=" +
              MAPBOX_TOKEN
          )
              .then((response) => response.json())
              .then((json) => {
                  setCityName(json.features[3].text);
              });
      } }
      >
        <Pin
          location={location} // dynamically apply colour without triggering rerenders
        />
      </Marker>
    ))
  );
};

export default Markers;
