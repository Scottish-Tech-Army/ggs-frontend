import React, { useRef, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Pin from "./components/Pin";
import NearestWaypoint from "./components/NearestWaypoint";
import FilterMarkers from "./components/FilterMarkers";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App(props) {
  // set up Mapbox credentials and map
  const MAPBOX_TOKEN =
    "secret";

  const [viewport, setViewport] = useState({
    height: "90vh",
    width: "94vw",
    latitude: 55.952014,
    longitude: -3.190728,
    zoom: 13,
    mapboxApiAccessToken: MAPBOX_TOKEN,
  });

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const geolocateControlStyle= {
    left: 15,
    top: 55
  };

  // dummy marker data
  const incomingMarkers = [
    {
      name: "Grey Friars Bobby Statue",
      lat: 55.946874,
      lng: -3.191229,
      tagged: true,
    },
    {
      name: "Edinburgh Castle Entrance",
      lat: 55.948400,
      lng: -3.196334,
      tagged: false,
    },
    {
      name: "Arthurs Seat Footpath",
      lat: 55.942384,
      lng: -3.197360,
      tagged: false,
    },
  ];

  // dummy coordinates to be replaced with user's location
  // dummy lat
  const myLat = 55.946874;

  // dummy lng
  const myLng = -3.191229;

  // modal controls
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Only rerender markers if props.data has changed
  const allMarkers = React.useMemo(() => incomingMarkers
  .filter(landmark => {
    return ((landmark.lat !== myLat) && (landmark.lng !== myLng));
  })
  .map(
    landmark => (
      <Marker key={landmark.name} longitude={landmark.lng} latitude={landmark.lat}>
        <Pin />
      </Marker>
    )
  ), [props.data]);

  return (
    <div className="container">
      <div className="sidebar">Girl Guiding Scotland</div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11" // insert choice of map style here from Mapbox Studio
        onViewportChange={setViewport}
      >
        <Marker latitude={55.946874} longitude={-3.191229} onClick={handleShow}>
          <Pin />
        </Marker>
        {allMarkers}
        <NavigationControl style={navControlStyle} showCompass={false} />
        <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
      />
      </ReactMapGL>
       {
          incomingMarkers
          .filter(marker => {
            return ((marker.lat === myLat) && (marker.lng === myLng));
          })
          .map(marker => (
            <Modal show={show} onHide={handleClose} centered>
            <Modal.Title key={marker.name}>{marker.name}</Modal.Title>
            <Modal.Body key={marker.tagged}>Tagged status={marker.tagged.toString()}</Modal.Body>
            <Button onClick={handleClose}>Close</Button>
            </Modal>
          ))
          }
      <NavBar />
    </div>
  );
}
