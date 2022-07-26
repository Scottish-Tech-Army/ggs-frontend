import React, { useEffect, useState, useContext, useRef } from "react";
import LeaderboardModal from "./LeaderboardModal";
import LocationModal from "./LocationModal";
import LoginModal from "./LoginModal";
import Loading from "./Loading";
import Markers from "./Markers";
import { getLocations } from "../services/locations";
import { authContext } from "../contexts/AuthContext";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import Button from "react-bootstrap/Button";
import { getLeaderboard } from "../services/leaderboard";
import "mapbox-gl/dist/mapbox-gl.css";

// Start app centred on Old College, Edinburgh
const START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 };

const OPENSTREETMAP_MAPSTYLE = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const MAPBOX_MAPSTYLE = "mapbox://styles/mapbox/streets-v11";

export default function App() {
  const { unit } = useContext(authContext);

  const mapRef = useRef();

  // Get the locations collection
  const [locations, setLocations] = useState([]);
  // Get the leaderboard collection
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    if (unit) {
      setShowLogin(false);
      getLocations(unit.email).then(setLocations);
    } else {
      setShowLogin(true);
    }
  }, [unit]);

  const [userLatLong, setUserLatLong] = useState();

  const navControlStyle = { right: 10, top: 10 };
  const geolocateControlStyle = { left: 15, top: 55 };

  // get user coordinates
  useEffect(() => {
    // set up device coordinate collection
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(position) {
      console.log("Geolocation available", position);
      setUserLatLong(position.coords);
      mapRef.current &&
        mapRef.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          duration: 2000,
        });
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.warn("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.warn("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.warn("The request to get user location timed out.");
          break;
        default:
          console.error("An unknown error occurred.", error);
          break;
      }
    }

    navigator.geolocation.getCurrentPosition(success, showError, options);
  }, []);

  // Loading-graphic controls
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Working"); // default message
  const [loadingTimer, setLoadingTimer] = useState(10000);
  // default display time set long because used when disconnect experienced
  // passing a long time to setLoadingTimer within handleDelay
  // was failing despite console.logs within the Loading component picking
  // up the updated loading time
  useEffect(() => {
    if (unit && !locations) {
      setLoadingText("Landmarks unavailable");
      setShowLoading(true);
    } else {
      setTimeout(setShowLoading, loadingTimer, false);
    }
  }, [locations, unit, loadingTimer]);

  // Modal controls
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClose = () => {
    setLoadingText("Logging in"); // Message for signed in users only
    setLoadingTimer(500);
    setShowLogin(false);
    setShowLoading(true);
  };

  // Retrieve modal data for selected pin
  const [selectedLocation, setSelectedLocation] = useState();

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapStyle = mapboxAccessToken ? MAPBOX_MAPSTYLE : OPENSTREETMAP_MAPSTYLE;

  console.log(
    mapboxAccessToken
      ? `Using Mapbox with access token ${mapboxAccessToken}`
      : "Using OpenStreetMap"
  );

  return (
    <div
      className="container-fluid"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
    >
      <ReactMapGL
        ref={mapRef}
        style={{ height: "100vh", width: "100vw" }}
        initialViewState={{
          latitude: START_LOCATION.latitude,
          longitude: START_LOCATION.longitude,
          zoom: 14,
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={mapboxAccessToken}
      >
        <Markers
          locations={locations}
          setSelectedLocation={setSelectedLocation}
        />
        <NavigationControl style={navControlStyle} showCompass={false} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          onGeolocate={({ coords }) => setUserLatLong(coords)}
          auto
        />
        <Button
          bsPrefix="btn-leaderboard"
          onClick={() => getLeaderboard(unit.email).then(setLeaderboard)}
        >
          Leaderboard
        </Button>
      </ReactMapGL>
      {selectedLocation && (
        <LocationModal
          handleCloseLocation={() => setSelectedLocation(undefined)}
          selectedLocation={selectedLocation}
          setLocations={setLocations}
          userLatLong={userLatLong}
        />
      )}
      {leaderboard && (
        <LeaderboardModal
          handleCloseLeaderboard={() => setLeaderboard(undefined)}
          leaderboard={leaderboard}
        />
      )}
      {showLogin && <LoginModal handleLoginClose={handleLoginClose} />}
      {showLoading && (
        <Loading
          handleCloseLoading={() => setShowLoading(false)}
          loadingText={loadingText}
          loadingTimer={loadingTimer}
        />
      )}
    </div>
  );
}
