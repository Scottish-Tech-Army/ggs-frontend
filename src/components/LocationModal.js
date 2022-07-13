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
  return (
    Math.abs(location.latitude - userLatLong.latitude) <= LOCATION_TOLERANCE &&
    Math.abs(location.longitude - userLatLong.longitude) <= LOCATION_TOLERANCE
  );
};

const LocationModal = ({
  selectedLocation,
  handleCloseLocation,
  setLocations,
  userLatLong,
}) => {
  const { unitName } = useContext(authContext);

  // Adapt the collecting button depending on user's proximity to the landmark location
  // and the collection status of the landmark location
  const [collectButtonText, setCollectButtonText] = useState();
  const [isOutOfRange, setIsOutOfRange] = useState(true);
  const [deviceErrMsg, setDeviceErrMsg] = useState();

  const handleCollectLocation = (event) => {
    collectLocation(unitName, selectedLocation.locationId)
      .then((response) => {
        if (response.ok) {
          // Update the frontend locations with the collected marker to match the backend status
          setLocations((locations) => {
            const index = locations.findIndex(
              (i) => i.locationId === selectedLocation.locationId
            );
            const locationList = [...locations];
            locationList[index].collected = true;
            return locationList;
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const photo = selectedLocation.photos[0];

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
          setCollectButtonText(
            inRange ? "Start Exploring" : "Please come closer to this location"
          );
        }
      }
    } catch (Error) {
      setDeviceErrMsg(Error.message.toString());
    }
  }, [selectedLocation, userLatLong]);

  const collectButtonDisabled = selectedLocation.collected || isOutOfRange;
  const areaName =
    selectedLocation.city && selectedLocation.city !== selectedLocation.county
      ? `${selectedLocation.city}, ${selectedLocation.county}`
      : selectedLocation.county;

  let creditLine = null;
  if (photo.attribution || photo.copyright) {
    let attributionElement = photo.originalUrl ? (
      <a href={photo.originalUrl} target="_blank" rel="noreferrer">
        {photo.attribution} {photo.copyright}
      </a>
    ) : (
      <>
        {photo.attribution} {photo.copyright}
      </>
    );
    creditLine = (
      <div className="img-location-credit">Credit: {attributionElement}</div>
    );
  }

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
          <img
            src={xPrimary}
            style={{ width: "200%", height: "200%" }}
            alt=""
          />
        </Button>
      </Modal.Header>
      <Modal.Body className="mt-n3">
        <div className="place-name">{selectedLocation.name}</div>
        <div className="city-name">{areaName}</div>
        <div className="scroll-container">
          <div className="scroll">
            {photo && (
              <>
                <Image
                  className="img-location"
                  src={photo.url}
                  alt={selectedLocation.name}
                  rounded
                />
                {creditLine}
              </>
            )}
            <div className="description">{selectedLocation.description}</div>
            {selectedLocation.collected && (
              <div className="challenge">
                <h2>Challenge</h2>
                <div className="content">{selectedLocation.challenge}</div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      {deviceErrMsg && (
        <div className="container">
          <img src={dividerLine} style={{ width: "100%" }} alt="" />
          <p className="feedback-branding">{deviceErrMsg}</p>
        </div>
      )}
      {!selectedLocation.collected && (
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
      )}
    </Modal>
  );
};

export default LocationModal;
