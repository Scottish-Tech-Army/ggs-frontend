import React from "react";
import ggLogo from "../assets/images/gg-logo.png";

export default function Loading({
  showLoading,
  setShowLoading,
  loadingText,
  loadingTimer,
}) {
  console.log("loadingTimer received by Loading is " + loadingTimer);
  setTimeout(setShowLoading, loadingTimer, false);
  console.log("loadingTimer after timeout is " + loadingTimer);
  return (
    <div className={showLoading ? "loading" : "not-loading"}>
      <div className="logo-frame">
        <img
          src={ggLogo}
          alt="Girl Guiding Scotland Logo"
          className="loading-img"
        />
        <p>{loadingText}</p>
      </div>
    </div>
  );
}
