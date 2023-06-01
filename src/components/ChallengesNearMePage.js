import React, { useEffect, useState, useContext, useRef } from "react";

// Modal pop-ups:
import LocationModal from "./LocationModal";
import GeolocErrorModal from "./GeolocErrorModal";

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
    

// A boolean state property. Code changes this
// so that the error modal shows (eg when the 
// user has blocked location services) or does 
// not:
const [showGeolocErrorModal, setShowGeolocErrorModal] = useState(false);


// A variable that code gives one of two values:
// i)   JSX for the GeolocErrorModal 
// ii)  null: 
let showModal 


    
    const mapRef = useRef();
// The click event handler for the button.
// This function must
// 1) determine whether the user has set her 
// browser so that it allows apps to 
// determine the user's location
// 2) show the error modal if the user has 
// not set that browser setting:
    const runFlyToOnce = () =>{
// 1):       
 if (userLatLong !== undefined) {
    mapRef.current.flyTo({
    center: [userLatLong.longitude, userLatLong.latitude],
    duration: 2000,
                         });
                                } else {
// 2):
setShowGeolocErrorModal(true)
                                       }
                              }



// Get the locations collection
const [locations, setLocations] = useState([]);




// When <AuthProvider/>'s state property unit changes 
// getLocations() asks the backend for the locations 
// array associated with this unit (or user):
useEffect(() => {
  if (unit) {

    // locations is an state property that is an array 
    getLocations(unit.email).then(setLocations);
    // 30 Mar23: Mukund added the following two lines for testing only:
    // let locationsData = JSON.stringify(locations)
    // console.log(`Inside useEffect inside <ChallengesNearMe/> and locations is: ` + locationsData)
  } else {
    // setShowLogin(true);
  }
}, [unit]);






// state property to hold the lat and long
// coords of the user.
const [userLatLong, setUserLatLong] = useState();

const navControlStyle = { right: 10, top: 10 };
const geolocateControlStyle = { left: 15, top: 55 };

// On startup of the app do this:
// 1) set some options and callbacks for function navigator.geolocation.getCurrentPosition()
// 2) Get the lat and long of the user
useEffect(() => {
  // 1):
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
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
        // console.warn("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        // console.warn("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        // console.warn("The request to get user location timed out.");
        break;
      default:
        // console.error("An unknown error occurred.", error);
        break;
    }
  }

// 2):   
  navigator.geolocation.getCurrentPosition(success, showError, options);
}, []); // When 2nd arg is empty array -> run this useEffect() only once, after the first 
// render of the component (ie the execution ofthe component function)


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
// will be either 
// i)  a load of JSX that describes the page
// ii) null 
let renderThis

// Now conditionally set renderThis 
// depending on the value of prop 
// isThisPageActive:

if (isThisPageActive) {
// If parent component <Home/> has set this 
// component's prop isThisPageActive to 
// true, render the ChallengesNearMe page:

renderThis = (
<div>

{/* The Go button: */}
<GGSbuttonOne
 buttonDivCSSclass = {"largeButton1New positionButton"}
 pTextCSSclass = {"buttonOperable"}
 clickHandler = {()=>{runFlyToOnce()}}
 pText = {"Click for your map"}
/>


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
        <NavigationControl style={navControlStyle} showCompass={true} />
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
            

{ /* If  there has been an error in getting the geolocation 
data from the browser (eg because the user has not turned on 
location services) then for several seconds show the modal that 
tells the user to turn on location services and then make 
the modal disappear. */ }
{ /* First the jsx for the modal box. showModal gets set either to
jsx that describes the modal or to null depending on the value of 
showGeolocErrorModal: */ }
{showModal}

{ /* set showModal either to null or the jsx : */ }
{showGeolocErrorModal ? ( <>
  {showModal} = <GeolocErrorModal errorMessage = {`This app cannot tell where you are. Change the setting in your browser that will allow this app to locate you.`} />
  {setTimeout(() => {
    showModal = null
    // Trigger a rerender:
    setShowGeolocErrorModal(false)
          }, 5000)}
</>
              ) : showModal = null

}


{/* The navigation bar at the bottom pof the page,
 which includes the home button and plus button)*/}
<NavigationBar iconsObject = {bigIconsObject.p2}/>


</div>
</div>
             ) 
                      } // end if (isThisPageActive)

                      
// If parent component <Home/> 
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
