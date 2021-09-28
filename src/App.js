import React, { useRef, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Pin from "./components/Pin";
import FilterMarkers from "./components/FilterMarkers";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { getLocations } from "./services/locations";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App(props) {
  // set up Mapbox credentials and map
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewport, setViewport] = useState({
    height: "90vh",
    width: "94vw",
    latitude: 55.952014,
    longitude: -3.190728,
    zoom: 10,
    mapboxApiAccessToken: MAPBOX_TOKEN,
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // console.log(MAPBOX_TOKEN);
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

  const geolocateControlStyle = {
    left: 15,
    top: 55,
  };

  // dummy marker data
  /* const incomingMarkers = [
    {
      name: "Grey Friars Bobby Statue",
      lat: 55.946874,
      lng: -3.191229,
      tagged: true,
    },
    {
      name: "Edinburgh Castle Entrance",
      lat: 55.9484,
      lng: -3.196334,
      tagged: false,
    },
    {
      name: "Arthurs Seat Footpath",
      lat: 55.942384,
      lng: -3.19736,
      tagged: false,
    },
  ]; */

  const incomingMarkers = locations;
  console.log("incomingMarkers : " + incomingMarkers[0]);

  // dummy coordinates to be replaced with user's location
  // dummy lat Grey Friars
  // const myLat = 55.946874;
  // dummy lat Edinburgh Airport
  const myLat = 55.949997;

  // dummy lng Grey Friars
  // const myLng = -3.191229;
  // dummy lng Edinburgh Airport
  const myLng = -3.370165;

  // modal controls
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Only rerender markers if props.data has changed
  /* const allMarkers = React.useMemo(
    () =>
      incomingMarkers
        .filter((marker) => {
          return marker.lat !== myLat && marker.lng !== myLng;
        })
        .map((landmark) => (
          <div className="waypoint">
            <Marker
              key={landmark.name}
              longitude={landmark.lng}
              latitude={landmark.lat}
              onClick={handleShow}
            >
              <Pin />
            </Marker>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Title key={landmark.name}>{landmark.name}</Modal.Title>
              <Modal.Body>
                Body text here.
              </Modal.Body>
              <Button onClick={handleClose}>Close</Button>
            </Modal>
          </div>
        )),
    [incomingMarkers, show]
  ); */

  return (
    <div className="container">
      <div className="sidebar">Girl Guiding Scotland</div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11" // insert choice of map style here from Mapbox Studio
        onViewportChange={setViewport}
      >
        {/* <Marker latitude={incomingMarkers[0].latitude} longitude={incomingMarkers[0].longitude} onClick={handleShow}>
          <Pin />
        </Marker>*/}
        {/* {allMarkers} */}
        <NavigationControl style={navControlStyle} showCompass={false} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
      </ReactMapGL>
{/*        {
          incomingMarkers
          .filter(marker => {
            return ((marker.lat === myLat) && (marker.lng === myLng));
          })
          .map(marker => (
            <Modal show={show} onHide={handleClose} centered>
            <Modal.Title key={marker.name}>{marker.name}</Modal.Title>
            <Modal.Body key={marker.description}>Tagged status={marker.description.toString()}</Modal.Body>
            <Button onClick={handleClose}>Close</Button>
            </Modal>
          ))
          } */}
      <NavBar />
    </div>
  );
}
