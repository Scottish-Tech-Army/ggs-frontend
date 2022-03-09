import React from "react";
import ggLogo from "../assets/images/gg-logo.png";

export default function Loading({ showLoading, setShowLoading }) {
  const handleFullScreenLoading = () => {
    setTimeout(setShowLoading, 30000, false);
  };
  handleFullScreenLoading();
  return (
    <div className={showLoading ? "loading" : "not-loading"}>
        <div className="logo-frame"><img src={ggLogo} alt="Girl Guiding Scotland Logo" className="loading-img" />
        <p>Loading</p></div>
    </div>
  );
}
