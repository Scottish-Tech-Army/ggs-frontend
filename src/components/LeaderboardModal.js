import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LeaderboardModal = ({ showLeaderboard, handleCloseLeaderboard, leaderboard }) => {
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
      <Modal.Body className="mt-n5">
        <h1>Leaderboard</h1>
        <div className="generic-photo" style={{height:"100px", width: "100%", backgroundColor: "teal", color: "white", textAlign: "center", fontSize: "20px"}}>A photo from the GGS collection will appear here.</div>
        <ol class="list-group list-group-numbered">
        {
          leaderboard &&
          leaderboard.sort((a, b) => (a.percentageCollected < b.percentageCollected) ? 1 : -1).map((data) => (
            <li className="list-group-item d-flex justify-content-evenly align-items-center">{data.area} 
            <span>{data.percentageCollected}%</span>
            </li>
          ))
        }
        </ol>
        <div className="units-list"></div>
      </Modal.Body>
    </Modal>
  );
};

export default LeaderboardModal;
