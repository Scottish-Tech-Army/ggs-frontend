import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { collectLocation } from "../services/locations";
import { authContext } from "../contexts/AuthContext";
import dividerLine from "./divider-line.svg";
import xPrimary from "./x-primary.svg";

const LocationModal = ({
  showLocation,
  handleCloseLocation,
  locationData,
  cityName,
  imgUrl,
  collectButtonText,
  isOutOfRange,
  updateLocation,
  deviceErrMsg,
}) => {
  const { token } = useContext(authContext);
  const [message, setMessage] = useState("");
  const handleCollectLocation = (event) => {
    collectLocation(token.data, locationData.id)
      .then((response) => {
        response.json().then((data) => {
          setMessage(data.message);
          if (response.ok) {
            updateLocation(locationData.id);
            setTimeout(closeLocationModal, 1000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const closeLocationModal = () => {
    setMessage("");
    handleCloseLocation();
  };
  return (
    <Modal
      show={showLocation}
      onHide={closeLocationModal}
      key={locationData.id}
      className="custom-modal location-modal"
    >
      <Modal.Header className="border-0 mb-n4">
        <Button
          variant="outline-primary"
          onClick={closeLocationModal}
          className="closer-position"
          aria-label="Close"
        >
          <img src={xPrimary} style={{
          width: "200%",
          height: "200%",
          }}/>
        </Button>
      </Modal.Header>
      <Modal.Body className="mt-n3">
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
      {message && (
        <div className="container">
          <img
            src={dividerLine}
            style={{ width: "100%" }}
            alt="decorative pink line"
          />
          <p className="feedback-branding">{message}</p>
        </div>
      )}
      {deviceErrMsg && ( <div className="container">
        <img
          src={dividerLine}
          style={{ width: "100%" }}
          alt="decorative pink line"
        />
        <p className="feedback-branding">{deviceErrMsg}</p>
      </div>)}
      <Button
        bsPrefix="btn-branding"
        onClick={handleCollectLocation}
        disabled={isOutOfRange}
        className={
          locationData.collected || isOutOfRange
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
