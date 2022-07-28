import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import xPrimary from "./x-primary.svg";

const LeaderboardModal = ({ handleCloseLeaderboard, leaderboard }) => {
  if (!leaderboard) {
    return null;
  }

  return (
    <Modal
      show={true}
      onHide={handleCloseLeaderboard}
      className="custom-modal leaderboard-modal"
    >
      <Modal.Header className="border-0 mb-n4">
        <Button
          variant="outline-primary"
          onClick={handleCloseLeaderboard}
          className="closer-position"
          aria-label="Close"
        >
          <img
            src={xPrimary}
            style={{
              width: "200%",
              height: "200%",
            }}
            alt=""
          />
        </Button>
      </Modal.Header>
      <Modal.Body className="mt-n3">
        <h1>Leaderboard</h1>
        {leaderboard.length ? (
          <ol className="list-group list-group-numbered">
            {leaderboard
              .sort((a, b) =>
                a.percentageCollected < b.percentageCollected ? 1 : -1
              )
              .slice(0, 10)
              .map((data, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {data.area}
                  <span className="badge bg-primary rounded-pill">
                    {data.percentageCollected}%
                  </span>
                </li>
              ))}
          </ol>
        ) : (
          <div>
            Collect some locations for them to appear on the leaderboard.
          </div>
        )}

        <div className="units-list"></div>
      </Modal.Body>
    </Modal>
  );
};

export default LeaderboardModal;
