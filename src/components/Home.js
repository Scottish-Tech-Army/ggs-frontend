import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import LoginModal from "./LoginModal";
import Pin from "./Pin";
import FilterMarkers from "./FilterMarkers";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { getLocationsAuth } from "../services/locations";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { Modal, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { authContext } from '../contexts/AuthContext';

export default function Home() {
    const { token } = useContext(authContext);
  // set up Mapbox credentials and map
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewport, setViewport] = useState({
    height: "90vh",
    width: "94vw",
    latitude: 55.952014,
    longitude: -3.190728,
    zoom: 14, // use 14 when zooming to standard view, 9 for wider Edinburgh.
    mapboxApiAccessToken: MAPBOX_TOKEN,
  });
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const [locations, setLocations] = useState([]);

  
  useEffect(() => {
    if(token.data){
      getLocationsAuth(token).then((items) => {
          setLocations(items);
      });
    }
    else{
      handleLoginShow();
    }
  }, [token]);


  // update modal img src
  const [imgUrl, setImgUrl] = useState("");

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

  // dummy coordinates to be replaced with user's location
  // dummy lat Grey Friars
  const myLat = 55.946874;
  // dummy lat Edinburgh Airport
  // const myLat = 55.949997;
  // near Edinburgh Airport
  //const myLat = 55.949996; // REPLACE WITH USER LOCATION

  // dummy lng Grey Friars
  const myLng = -3.191229;
  // dummy lng Edinburgh Airport
  // const myLng = -3.370165;
  // near Edinburgh Airport
  //const myLng = -3.370164; // REPLACE WITH USER LOCATION

  // change this as needed for coordinate distance from landmark. Note 0.00001 is approx equal to 11 metres.
  const locTolerance = 0.00001;

  // modal controls
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // retrieve modal data for selected pin
  const [locationData, setLocationData] = useState([]);

  return (
    <div className="container">
      <div className="sidebar">Girl Guiding Scotland</div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11" // insert choice of map style here from Mapbox Studio
        onViewportChange={setViewport}
      >
        {locations &&
          locations.map((location, index) => (
            <Marker
              key={location.id}
              index={index}
              marker={location}
              latitude={location.latitude}
              longitude={location.longitude}
              onClick={() => {
                handleShow();
                setLocationData(location);
                if (location.photos.length > 0) {
                  setImgUrl(location.photos[0].url);
                  // console.log("photo: " + location.photos[0].url);
                } else {
                  setImgUrl("missing");
                }
              }}
            >
              <Pin />
            </Marker>
          ))}
        <NavigationControl style={navControlStyle} showCompass={false} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
      </ReactMapGL>
      <Modal
        show={show}
        onHide={handleClose}
        key={locationData.id}
        centered
        scrollable
      >
        <Modal.Title>{locationData.name}</Modal.Title>
        <Modal.Body>
          <Image src={imgUrl} alt={"image " + imgUrl} rounded fluid />
          <br />
          {locationData.description}
        </Modal.Body>
        <Button onClick={handleClose}>Close</Button>
      </Modal>
      <LoginModal 
      showLogin={showLogin} 
      handleLoginClose={handleLoginClose} 
      />
      <NavBar />
    </div>
  );
            };