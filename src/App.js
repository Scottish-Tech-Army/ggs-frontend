import React, { useEffect, useState } from "react";
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
  // Set up Mapbox credentials and map
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewport, setViewport] = useState({
    height: "99vh",
    width: "99vw",
    latitude: 55.952014,
    longitude: -3.190728,
    zoom: 14, // use 14 when zooming to standard view, 9 for wider Edinburgh.
    mapboxApiAccessToken: MAPBOX_TOKEN,
  });

  // Get the locations collection
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

  // Update modal img src
  const [imgUrl, setImgUrl] = useState("");

  // Update currently viewed location's longitude
  const [locLng, setLocLng] = useState("");

  // Update currently viewed location's latitude
  const [locLat, setLocLat] = useState("");

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const geolocateControlStyle = {
    left: 15,
    top: 55,
  };

  // dummy coordinates to be replaced with user's location
  // dummy lat Grey Friars
  const myLat = 55.946874;

  // dummy lng Grey Friars
  const myLng = -3.191229;

  // Change this as needed for coordinate distance from landmark. Note 0.00001 is approx equal to 11 metres.
  const locTolerance = 0.00001;

  // Adapt the collecting button depending on user's proximity to the landmark location
  const [collectButtonText, setCollectButtonText] = useState("Start Exploring"); // default button text
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const userRangeCheck = () => {
    if (
      locLng >= myLng - locTolerance &&
      locLat >= myLat - locTolerance &&
      locLng <= myLng + locTolerance &&
      locLat <= myLat + locTolerance
    ) {
      setIsOutOfRange(false);
      setCollectButtonText("Start Exploring"); // text when user in range
    } else {
      setIsOutOfRange(true);
      setCollectButtonText("Please come closer to this location"); // text when user not in range
    }
  };

  // Modal controls
  const [showLocation, setShowLocation] = useState(false);
  const handleCloseLocation = () => setShowLocation(false);
  const handleShowLocation = () => setShowLocation(true);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const handleCloseLeaderboard = () => setShowLeaderboard(false);
  const handleShowLeaderboard = () => setShowLeaderboard(true);

  // Retrieve modal data for selected pin
  const [locationData, setLocationData] = useState([]);

  // Retrieve city name to match modal data
  const [cityName, setCityName] = useState([]);

  return (
    <div className="container-fluid">
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
                setLocLng(location.longitude);
                setLocLat(location.latitude);
                userRangeCheck();
                handleShowLocation();
                setLocationData(location);
                console.log(locationData);
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
        <Button bsPrefix="btn-leaderboard" onClick={handleShowLeaderboard}>
          Leaderboard
        </Button>
      </ReactMapGL>
      <Modal
        show={showLocation}
        onHide={handleCloseLocation}
        key={locationData.id}
        className="custom-modal location-modal"
      >
        <Modal.Header className="border-0">
          <Button
            variant="outline-primary"
            onClick={handleCloseLocation}
            style={{
              fontSize: 30,
              fontWeight: "bold",
              lineHeight: 1,
              position: "relative",
              top: -40,
              right: -275,
              opacity: 1,
              backgroundColor: "white",
              paddingTop: 0,
              paddingBottom: 4,
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 4,
            }}
            bsPrefix="closer-color"
          >
            &times;
          </Button>
        </Modal.Header>
        <Modal.Body scrollable>
          <div className="place-name">{locationData.name}</div>
          <div className="city-name">{cityName}</div>
          <Image
            className="img-location"
            src={imgUrl}
            alt={"image " + imgUrl}
            rounded
          />
          <div className="description">{locationData.description}</div>
        </Modal.Body>
        <Button
          bsPrefix="btn-branding"
          onClick={handleCloseLocation}
          className={
            isOutOfRange ? "btn-branding-out-of-range" : "btn-branding-in-range"
          }
        >
          {collectButtonText}
        </Button>
      </Modal>
      <Modal
        show={showLeaderboard}
        onHide={handleCloseLeaderboard}
        className="custom-modal leaderboard-modal"
      >
        <Modal.Header className="border-0">
          <Button
            variant="outline-primary"
            onClick={handleCloseLeaderboard}
            style={{
              fontSize: 30,
              fontWeight: "bold",
              lineHeight: 1,
              position: "relative",
              top: -40,
              right: -275,
              opacity: 1,
              backgroundColor: "white",
              paddingTop: 0,
              paddingBottom: 4,
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 4,
            }}
            bsPrefix="closer-color"
          >
            &times;
          </Button>
        </Modal.Header>
        <Modal.Body scrollable>
          <h1>Leaderboard</h1>
          Generic image followed by top 10 units by number of locations
          collected.
          <div className="units-list"></div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
