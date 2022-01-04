import React, { useRef, useEffect, useState } from "react";
import Pin from "./components/Pin";
import { getLocations } from "./services/locations";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { Modal, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App(props) {
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

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let mounted = true;
    getLocations().then((items) => {
      if (mounted) {
        setLocations(items);
        console.log(locations);
      }
    });
    return () => (mounted = false);
  }, []);

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

  // retrieve city name to match modal data
  const [cityName, setCityName] = useState([]);

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
        <Modal.Header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x-square closing-square"
            viewBox="0 0 16 16"
            onClick={handleClose}
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </Modal.Header>
        <Modal.Body>
          <div className="place-name">{locationData.name}</div>
          <div className="city-name">{cityName}</div>
          <Image
            className="location-modal"
            src={imgUrl}
            alt={"image " + imgUrl}
            rounded
            fluid
          />
          <br />
          {locationData.description}
        </Modal.Body>
        <Button bsPrefix="btn-branding" onClick={handleClose}>
          Start Exploring
        </Button>
      </Modal>
    </div>
  );
}
