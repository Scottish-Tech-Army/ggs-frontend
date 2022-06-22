/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState } from "react";
import ggsLogoStd from "!file-loader!./ggs-logo-std.svg";
import ggsLogoPrimary from "!file-loader!./ggs-logo-primary.svg";
import ggsLogoSecondary from "!file-loader!./ggs-logo-secondary.svg";
import { CSSTransition } from "react-transition-group";

export default function Loading({
  handleCloseLoading,
  loadingText,
  loadingTimer,
}) {
  const [ShowTeal, setShowTeal] = useState(true);
  const [ShowPink, setShowPink] = useState(false);

  setTimeout(handleCloseLoading, loadingTimer);

  return (
    <div className="loading">
      <div className="logo-frame">
        <img
          src={ggsLogoStd}
          alt="Girl Guiding Scotland Logo in standard blue"
          className="loading-img"
        />
        <CSSTransition
          in={ShowTeal}
          appear={ShowTeal}
          timeout={1000}
          classNames="logo-transition"
          unmountOnExit
          onEntered={() => setShowTeal(false)}
          onExited={() => setShowPink(true)}
        >
          <img
            src={ggsLogoPrimary}
            alt="Girl Guiding Scotland Logo in teal"
            className="loading-img"
          />
        </CSSTransition>
        <CSSTransition
          in={ShowPink}
          appear={ShowPink}
          timeout={1000}
          classNames="logo-transition"
          unmountOnExit
          onEntered={() => setShowPink(false)}
          onExited={() => setShowTeal(true)}
        >
          <img
            src={ggsLogoSecondary}
            alt="Girl Guiding Scotland Logo in pink"
            className="loading-img"
          />
        </CSSTransition>

        <p>{loadingText}</p>
      </div>
    </div>
  );
}
