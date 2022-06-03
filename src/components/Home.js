import React, { useEffect, useState, useContext } from "react";
import LeaderboardModal from "./LeaderboardModal";
import LocationModal from "./LocationModal";
import LoginModal from "./LoginModal";
import Loading from "./Loading";
import Markers from "./Markers";
import { getLocationsAuth } from "../services/locations";
import { authContext } from "../contexts/AuthContext";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import Button from "react-bootstrap/Button";
import { getLeaderboardAuth } from "../services/leaderboard";

export default function App() {
  const { token } = useContext(authContext);
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
  // Get the leaderboard collection
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (token.data) {
      getLocationsAuth(token.data).then((items) => {
        setLocations(items);
        //console.log(items);
      });
      getLeaderboardAuth(token.data).then((items) => {
        setLeaderboard(items);
        //console.log(items);
      });
    } else {
      handleLoginShow();
    }
  }, [token]);
  useEffect(() => {}, [locations]);
  // Update modal img src
  const [imgUrl, setImgUrl] = useState("");

  // Update currently viewed location's longitude
  const [locLng, setLocLng] = useState("");

  // Update currently viewed location's latitude
  const [locLat, setLocLat] = useState("");

  // Update user's longitude
  const [myLng, setMyLng] = useState("");

  // Update user's latitude
  const [myLat, setMyLat] = useState("");

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
  // const myLat = 55.946874;

  // dummy lng Grey Friars
  // const myLng = -3.191229;

  // set up device coordinate collection
  // helper
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  // helper
  function success(position) {
    //console.log("Geolocation available");
    let crd = position.coords;
    console.log("Latitude: " + crd.latitude);
    console.log("Longitude: " + crd.longitude);
    setMyLng(crd.longitude);
    setMyLat(crd.latitude);
    setDeviceErrMsg("");
  }
  // helper
  function showError(error) {
    //console.log("You have reached the error handler");
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }
  // get user coordinates (uses above helpers)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, showError, options);
  }, []);

  // Change this as needed for coordinate distance from landmark. Note 0.00001 is approx equal to 11 metres.
  const locTolerance = 0.00001;

  // Adapt the collecting button depending on user's proximity to the landmark location
  // and the collection status of the landmark location
  const [collectButtonText, setCollectButtonText] = useState(
    "Please come closer to this location"
  ); // default button text
  const [isOutOfRange, setIsOutOfRange] = useState(true);
  const [deviceErrMsg, setDeviceErrMsg] = useState();
  const userRangeCheck = () => {
    try {
      if (myLng == "" || myLat == "") {
        throw new Error("Please turn on location tracking");
      } else {
        console.log("comparing coords");
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
      }
    } catch (Error) {
      setDeviceErrMsg(Error.message.toString());
    }
  };

  // Loading-graphic controls
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Working"); // default message
  const [loadingTimer, setLoadingTimer] = useState(10000); // default display time set long because used when disconnect experienced
  // passing a long time to setLoadingTimer within handleDelay was failing despite console.logs within the Loading component picking
  // up the updated loading time
  useEffect(() => {
    const handleDelay = async () => {
      // uses default time
      //console.log("Running with no locations and timer set to " + loadingTimer);
      setLoadingText("Landmarks unavailable");
    };
    if (token.data && !locations) {
      //console.log("Delay applied");
      handleDelay();
      setShowLoading(true);
    } else {
      setTimeout(setShowLoading, loadingTimer, false);
      //console.log("Default process");
    }
    //console.log("Loading timer updated to " + loadingTimer);
  }, [locations, token]);

  // Modal controls
  const [showLocation, setShowLocation] = useState(false);
  const handleCloseLocation = () => setShowLocation(false);
  const handleShowLocation = () => setShowLocation(true);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const handleCloseLeaderboard = () => setShowLeaderboard(false);
  const handleShowLeaderboard = () => setShowLeaderboard(true);

  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClose = () => {
    setShowLogin(false);
    setShowLoading(true);
  };
  const handleLoginShow = () => setShowLogin(true);

  // Retrieve modal data for selected pin
  const [locationData, setLocationData] = useState([]);

  // Retrieve city name to match modal data
  const [cityName, setCityName] = useState([]);

  // Update the frontend locations with the collected marker to match the backend status
  const updateLocation = (id) => {
    const index = locations.findIndex((i) => i.id === id);
    const locationList = [...locations];
    locationList[index].collected = true;
    setLocations(locationList);
  };

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
        <Markers
          locations={locations}
          setLocLng={setLocLng}
          setLocLat={setLocLat}
          handleShowLocation={handleShowLocation}
          setLocationData={setLocationData}
          userRangeCheck={userRangeCheck}
          setImgUrl={setImgUrl}
          setCityName={setCityName}
          MAPBOX_TOKEN={MAPBOX_TOKEN}
        />
        <NavigationControl style={navControlStyle} showCompass={false} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
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
        updateLocation={updateLocation}
        deviceErrMsg={deviceErrMsg}
      />
      <LeaderboardModal
        showLeaderboard={showLeaderboard}
        handleCloseLeaderboard={handleCloseLeaderboard}
        leaderboard={leaderboard}
      />
      <LoginModal
        showLogin={showLogin}
        loadingText={loadingText}
        setLoadingText={setLoadingText}
        loadingTimer={loadingTimer}
        setLoadingTimer={setLoadingTimer}
        handleLoginClose={handleLoginClose}
      />
      <Loading
        showLoading={showLoading}
        setShowLoading={setShowLoading}
        loadingText={loadingText}
        setLoadingText={setLoadingText}
        loadingTimer={loadingTimer}
        setLoadingTimer={setLoadingTimer}
        locations={locations}
        token={token}
      />
    </div>
  );
}
