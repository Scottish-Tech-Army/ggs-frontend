import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { collectLocation } from "../services/locations";
import { authContext } from '../contexts/AuthContext';

const LocationModal = ({ showLocation, handleCloseLocation, locationData, cityName, imgUrl, collectButtonText, isOutOfRange, updateLocation }) => {
  const { token } = useContext(authContext);
  const [message, setMessage] = useState("");
  const handleCollectLocation = (event) => {
    collectLocation(token.data, locationData.id)
    .then((response) => {
      response.json()
      .then(data => {
        setMessage(data.message);
        if (response.ok)
        {      
          updateLocation(locationData.id)
          setTimeout(closeLocationModel, 1000);
        }
      })
    })
    .catch(error => {
        console.error(error);
    });
    event.preventDefault();
    };

    const closeLocationModel = () => {
      setMessage("");
      handleCloseLocation();
    } 
  return (
    <Modal
        show={showLocation}
        onHide={closeLocationModel}
        key={locationData.id}
        className="custom-modal location-modal"
      >
        <Modal.Header className="border-0 mb-n4">
          <Button
            variant="outline-primary"
            onClick={handleCloseLocation}
            className="closer-position"
            bsPrefix="closer-color"
          >
            &times;
          </Button>
        </Modal.Header>
        <Modal.Body scrollable className="mt-n5">
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
          onClick={handleCollectLocation}
          disabled={isOutOfRange}
          className={
            isOutOfRange ? "btn-branding-out-of-range" : "btn-branding-in-range"
          }
        >
          {collectButtonText}
        </Button>
        {message && <p>{message}</p>}
      </Modal>
  );
};

export default LocationModal;