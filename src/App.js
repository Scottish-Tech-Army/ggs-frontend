import React, { useRef, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Pin from "./components/Pin";
import Markers from "./components/Markers.js";
import FilterMarkers from "./components/FilterMarkers";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { getLocations } from "./services/locations";

export default function App(props) {
  // set up Mapbox credentials and map
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewport, setViewport] = useState({
    height: "90vh",
    width: "100vw",
    latitude: 55.952014,
    longitude: -3.190728,
    zoom: 13,
    mapboxApiAccessToken: MAPBOX_TOKEN,
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log(MAPBOX_TOKEN);
    let mounted = true;
    getLocations().then((items) => {
      if (mounted) {
        setLocations(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  // write handler here to reveal pin text when Marker clicked/pressed.
  // TO DO.

  // dummy marker data
  const incomingMarkers = [
    {
      id: "greyFriarsBobbyStatue",
      lat: "55.946874",
      lng: "-3.191229",
    },
    {
      id: "edinburghCastleEntrance",
      lat: "55.948400",
      lng: "-3.196334",
    },
    {
      id: "arthursSeatFootpath",
      lat: "55.942384",
      lng: "-3.197360",
    },
  ];

  const myTaggedMarkers = [
    {
      id: "greyFriarsBobbyStatue",
      lat: "55.946874",
      lng: "-3.191229",
    },
  ];

  const [allMarkers] = useState(incomingMarkers);
  const [taggedMarkers] = useState(myTaggedMarkers);

  return (
    <div className="container">
      <div className="sidebar">Girl Guiding Scotland</div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11" // insert choice of map style here from Mapbox Studio
        onViewportChange={setViewport}
      >
        <Marker latitude={55.946} longitude={-3.191} onClick={props.showModal}>
          <Pin />
        </Marker>
        <NavigationControl style={navControlStyle} showCompass={false} />
      </ReactMapGL>
      <NavBar />
    </div>
  );
}
