import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { collectLocation } from "../services/locations";
import { authContext } from "../contexts/AuthContext";
import dividerLine from "./divider-line.svg";
import xPrimary from "./x-primary.svg";

// Change this as needed for coordinate distance from landmark. Note 0.00001 is approx equal to 11 metres.
const LOCATION_TOLERANCE = 0.00001;

const isLocationInRange = (location, userLatLong) => {
  return Math.abs(location.latitude - userLatLong.latitude) <= LOCATION_TOLERANCE &&
    Math.abs(location.longitude - userLatLong.longitude) <= LOCATION_TOLERANCE
};

const LocationModal = ({
  selectedLocation,
  handleCloseLocation,
  setLocations,
  userLatLong
}) => {
  const { unitName } = useContext(authContext);
  const [message, setMessage] = useState("");

  // Adapt the collecting button depending on user's proximity to the landmark location
  // and the collection status of the landmark location
  const [collectButtonText, setCollectButtonText] = useState();
  const [isOutOfRange, setIsOutOfRange] = useState(true);
  const [deviceErrMsg, setDeviceErrMsg] = useState();
  const [imgUrl, setImgUrl] = useState();

  // Update the frontend locations with the collected marker to match the backend status
  const updateLocation = (locationId) => {
    setLocations(locations => {
      const index = locations.findIndex((i) => i.locationId === locationId);
      const locationList = [...locations];
      locationList[index].collected = true;
      return locationList
    });
  };

  const handleCollectLocation = (event) => {
    collectLocation(unitName, selectedLocation.locationId)
      .then((response) => {
        if (response.ok) {
          setMessage("Collected!");
          setTimeout(handleCloseLocation, 1000);
          updateLocation(selectedLocation.locationId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  useEffect(() => {
    if (selectedLocation.photos.length > 0) {
      setImgUrl(selectedLocation.photos[0].url);
    } else {
      setImgUrl("missing");
    }
  }, [selectedLocation])

  useEffect(() => {
    try {
      if (!userLatLong) {
        throw new Error("Please turn on location tracking");
      } else {
        const inRange = isLocationInRange(selectedLocation, userLatLong);
        setIsOutOfRange(!inRange);

        if (selectedLocation.collected) {
          setCollectButtonText("Collected");
        } else {
          setCollectButtonText(inRange ? "Start Exploring" : "Please come closer to this location");
        }
      }
    } catch (Error) {
      setDeviceErrMsg(Error.message.toString());
    }

  }, [selectedLocation, userLatLong])

  const collectButtonDisabled = selectedLocation.collected || isOutOfRange;

  return (
    <Modal
      show={true}
      onHide={handleCloseLocation}
      key={selectedLocation.locationId}
      className="custom-modal location-modal"
    >
      <Modal.Header className="border-0 mb-n4">
        <Button
          variant="outline-primary"
          onClick={handleCloseLocation}
          className="closer-position"
          aria-label="Close"
        >
          <img src={xPrimary} style={{ width: "200%", height: "200%" }} alt="" />
        </Button>
      </Modal.Header>
      <Modal.Body className="mt-n3">
        <div className="place-name">{selectedLocation.name}</div>
        <div className="city-name">{selectedLocation.area}</div>
        <Image
          className="img-location"
          src={imgUrl}
          alt={selectedLocation.name}
          rounded
        />
        <div className="description">{selectedLocation.description}</div>
      </Modal.Body>
      {message && (
        <div className="container">
          <img src={dividerLine} style={{ width: "100%" }} alt="" />
          <p className="feedback-branding">{message}</p>
        </div>
      )}
      {deviceErrMsg && (<div className="container">
        <img src={dividerLine} style={{ width: "100%" }} alt="" />
        <p className="feedback-branding">{deviceErrMsg}</p>
      </div>)}
      <Button
        bsPrefix="btn-branding"
        onClick={handleCollectLocation}
        disabled={collectButtonDisabled}
        className={
          collectButtonDisabled
            ? "btn-branding-disabled mx-2 mb-2"
            : "btn-branding-enabled mx-2 mb-2"
        }
      >
        {collectButtonText}
      </Button>
    </Modal>
  );
};

export default LocationModal;
