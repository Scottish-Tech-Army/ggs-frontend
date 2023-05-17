import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { collectLocation } from "../services/locations";
import { authContext } from "../contexts/AuthContext";
import dividerLine from "./divider-line.svg";
import xPrimary from "./x-primary.svg";
import placeholderPhoto from "./image-coming-soon.png";

// Change this as needed for coordinate distance from landmark.
const LOCATION_TOLERANCE_LATITUDE = 0.0002; // Note 0.0002 is approx equal to 22 metres.
const LOCATION_TOLERANCE_LONGITUDE = 0.0004; // Note 0.0004 is approx equal to 24 metres.

const isLocationInRange = (location, userLatLong) => {
  return (
    Math.abs(location.latitude - userLatLong.latitude) <= LOCATION_TOLERANCE_LATITUDE &&
    Math.abs(location.longitude - userLatLong.longitude) <= LOCATION_TOLERANCE_LONGITUDE
  );
};

const LocationModal = ({
  selectedLocation,
  handleCloseLocation,
  setLocations,
  userLatLong,
}) => {
  const { unit } = useContext(authContext);

  const [isOutOfRange, setIsOutOfRange] = useState(true);
  const [deviceErrMsg, setDeviceErrMsg] = useState();

  const handleCollectLocation = (event) => {
    collectLocation(unit.email, selectedLocation.locationId)
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

  // Mukund: Set a variable to the object that is in array photos 
  // of object selectedLocation (location). array photos looks like this:
  // [{url:  "https://dz1ex1yb0vxyz.cloudfront.net/dunbartonshire-bearsden-thegruffalotrail.jpg"}]
    const photo = selectedLocation.photos[0];

  useEffect(() => {
    if (!userLatLong) {
      setDeviceErrMsg("Please turn on location tracking");
      setIsOutOfRange(true);
    } else {
      setIsOutOfRange(!isLocationInRange(selectedLocation, userLatLong));
    }
  }, [selectedLocation, userLatLong]);

  // Adapt the collecting button depending on user's proximity to the landmark location
  // and the collection status of the landmark location
  const collectButtonDisabled = selectedLocation.collected || isOutOfRange;
  const collectButtonText = isOutOfRange
    ? "Please come closer to this location"
    : "Tap to reveal challenge";

  const areaName =
    selectedLocation.city && selectedLocation.city !== selectedLocation.county
      ? `${selectedLocation.city}, ${selectedLocation.county}`
      : selectedLocation.county;

  function getPhoto(photo) {
    if (!photo) {
      return (
        <>
          <Image
            className="img-location"
            src={placeholderPhoto}
            alt="no image available"
            rounded
          />
          <div className="challenge">
            <h2>Bonus Challenge</h2>
            <div className="content">
              Will you be the first to take a picture of this location? Take a
              photo and send it to us at{" "}
              <a href="mailto:web@girlguiding-scot.org.uk">
                web@girlguiding-scot.org.uk
              </a>
            </div>
          </div>
        </>
      );
    }

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
      <>
        <Image
          className="img-location"
          src={photo.url}
          alt={selectedLocation.name}
          rounded
        />
        {creditLine}
      </>
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
            {getPhoto(photo)}
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
      {!!deviceErrMsg && (
        <div className="container">
          <img src={dividerLine} style={{ width: "100%" }} alt="" />
          <p className="feedback-branding">{deviceErrMsg}</p>
        </div>
      )}
      {!selectedLocation.collected && !deviceErrMsg && (
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
