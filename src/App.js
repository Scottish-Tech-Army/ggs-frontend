import React, { useEffect, useState } from "react";
import Pin from "./components/Pin";
import LeaderboardModal from "./components/LeaderboardModal";
import LocationModal from "./components/LocationModal";
import { getLocations } from "./services/locations";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import Button from "react-bootstrap/Button";


export default function App() {
  // Set up Mapbox credentials and map
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewport, setViewport] = useState({
    height: "100vh",
    width: "100vw",
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
    <div
      className="container-fluid"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
    >
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
      <LocationModal
        showLocation={showLocation}
        handleCloseLocation={handleCloseLocation}
        collectButtonText={collectButtonText}
        locationData={locationData}
        cityName={cityName}
        imgUrl={imgUrl}
        isOutOfRange={isOutOfRange}
      />
      <LeaderboardModal
        showLeaderboard={showLeaderboard}
        handleCloseLeaderboard={handleCloseLeaderboard}
      />
    </div>
  );
}
