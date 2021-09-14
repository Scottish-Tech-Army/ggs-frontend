import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Waypoint from "./Waypoint";

const NearestWaypoint = (props) => {
    const fakeLocation = {
      lat: "55.946874",
      lng: "-3.191229",
    }
  return (
    <div className="nearest-waypoint">
        {
            /* props
            .filter(waypoint => waypoint.lat === '55.946874')
            .map(waypoint => <p key={waypoint.id}>{waypoint.lat}</p>) */
        }
    </div>
        
  );
};

export default NearestWaypoint;
