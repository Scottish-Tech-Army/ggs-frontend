import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LeaderboardModal = ({ showLeaderboard, handleCloseLeaderboard }) => {
  return (
    <Modal
      show={showLeaderboard}
      onHide={handleCloseLeaderboard}
      className="custom-modal leaderboard-modal"
    >
      <Modal.Header className="border-0 mb-n4">
        <Button
          variant="outline-primary"
          onClick={handleCloseLeaderboard}
          className="closer-position"
          bsPrefix="closer-color"
        >
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body scrollable className="mt-n5">
        <h1>Leaderboard</h1>
        Generic image followed by top 10 units by number of locations collected.
        <div className="units-list"></div>
      </Modal.Body>
    </Modal>
  );
};

export default LeaderboardModal;
