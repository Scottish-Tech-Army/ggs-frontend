import React, { useEffect, useState, useContext, useRef } from "react";

// Modal pop-ups:
import LocationModal from "./LocationModal";
import Loading from "./Loading";

// Stuff do do with ReactMapGL:
import Markers from "./Markers";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


// Other stuff
import { getLocations } from "../services/locations";

// Other components:
import NavigationBar from "./NavigationBar.js";
import GGSbuttonOne from "./GGSbuttonOne";

// context
// Consume the context that gets made available to this
// component from <MenuContext/> 
import {MenuContext} from "./Home.js"
// Consume the context that gets made available to this
// component from <AuthContext/>
import { authContext } from "../contexts/AuthContext";



// css stuff:
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




export default function ChallengesNearMePage({
    isThisPageActive
                                            })
                                            {


    // Mukund: Get the unit object from <AuthContext>:
    const { unit } = useContext(authContext);
    // Mukund added the following two lines for testing only:
    // var str = JSON.stringify(unit);
    // console.log(`Inside <ChallengesNearMe/> and json-string version of unit is: ` + str)

    // Consume the big object
    const bigIconsObject = useContext(MenuContext);

    // Mukund: Get a reference to component <ReactGraphGl/>
    // so that you can access all of the component's functions
    // this way:   mapRef.current.*nameOfFunction()*.
    // See https://docs.mapbox.com/mapbox-gl-js/api/map/ for list of MapBox's Map functions: 
    
    
    const mapRef = useRef();
// The clikc event handler for the button:
    const runFlyToOnce = () =>{
  
  mapRef.current.flyTo({
    center: [userLatLong.longitude, userLatLong.latitude],
    duration: 2000,
                       });
                           }



// Get the locations collection
const [locations, setLocations] = useState([]);




// When <AuthProvider/>'s state property unit changes 
// ask the backend for the locations array associated with
// this unit (ie the user):
useEffect(() => {
  if (unit) {
    // setShowLogin(false);
    getLocations(unit.email).then(setLocations);
    // 30 Mar23: Mukund added the following two lines for testing only:
    // let locationsData = JSON.stringify(locations)
    // console.log(`Inside useEffect inside <ChallengesNearMe/> and locations is: ` + locationsData)
  } else {
    // setShowLogin(true);
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
    // console.log("Geolocation available", position);
    setUserLatLong(position.coords);
   
    // 30mar23: Mukund: mapRef represents component <ReactMapGL/>

    /* 31Mar23: Mukund: original code commented out: 
    
    mapRef.current &&
      mapRef.current.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        duration: 2000,
      });
    */

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
}, []); // empty array (2nd arg) = run this useEffect() only on first mount of component


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


// Retrieve modal data for selected pin
const [selectedLocation, setSelectedLocation] = useState();

const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const mapStyle = mapboxAccessToken ? MAPBOX_MAPSTYLE : OPENSTREETMAP_MAPSTYLE;

console.log(
  mapboxAccessToken
    ? `Using Mapbox with access token ${mapboxAccessToken}`
    : "Using OpenStreetMap"
);




// ------------------- Now the actual rendering -------------------

// Define the variable whose value 
// will be either a load of JSX that 
// describes the page or null 
let renderThis

// Now conditionally set renderThis 
// depending on the value of prop 
// isThisPageActive:

if (isThisPageActive) {
// If the parent component (ie <Home/>) 
// has set this component's prop isThisPageActive to 
// true, render the ChallengesNearMe page:

renderThis = (
<div>

{/* The Go button: */}
<GGSbuttonOne
 buttonDivCSSclass = {"largeButton1New positionButton"}
 pTextCSSclass = {"buttonOperable"}
 clickHandler = {()=>{runFlyToOnce()}}
 pText = {"Go"}
/>

{/* old code -- remove when ready to
<div className="largeButton1New positionButton" onClick={()=>{runFlyToOnce()}}>
  <p className="buttonOperable">Go</p>
</div>
*/}

  <div
      className="container-fluid"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >


<ReactMapGL
        ref={mapRef}
        style={{ height: "100vh", width: "100vw"  }}
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
      </ReactMapGL>
      {selectedLocation && (
        <LocationModal
          handleCloseLocation={() => setSelectedLocation(undefined)}
          selectedLocation={selectedLocation}
          setLocations={setLocations}
          userLatLong={userLatLong}
        />
      )}
      {/* {leaderboard && (
        <LeaderboardModal
          handleCloseLeaderboard={() => setLeaderboard(undefined)}
          leaderboard={leaderboard}
        />
      )}*/}
      {/* Mukund: The following is only for the login modal and not needed here:
      {showLoading && (
        <Loading
          handleCloseLoading={() => setShowLoading(false)}
          loadingText={loadingText}
          loadingTimer={loadingTimer}
        />
        
      )}
      */}



{/* The navigation bar (which includes the plus-icon menu)*/}
<NavigationBar iconsObject = {bigIconsObject.p2}/>


</div>
</div>
             ) 
                      } // end if (isThisPageActive)

                      
// If the parent component (ie <Home/>) 
// has set prop isThisPageActive to  
// false, don't render anything:
if (!isThisPageActive) {
    renderThis = null
                       } // end if

    

    return (
<div>
{renderThis}
</div>
           )


} // end ChallengesNearMePage
