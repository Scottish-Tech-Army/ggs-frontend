import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const LocationModal = ({ showLocation, handleCloseLocation, locationData, cityName, imgUrl, collectButtonText, isOutOfRange }) => {
  return (
    <Modal
        show={showLocation}
        onHide={handleCloseLocation}
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
          onClick={handleCloseLocation}
          className={
            isOutOfRange ? "btn-branding-out-of-range m-3" : "btn-branding-in-range m-3"
          }
        >
          {collectButtonText}
        </Button>
      </Modal>
  );
};

export default LocationModal;