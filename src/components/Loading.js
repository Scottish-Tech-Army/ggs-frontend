import React, { useState } from "react";
import ggsLogoStd from "./ggs-logo-std.svg";
import ggsLogoPrimary from "./ggs-logo-primary.svg";
import ggsLogoSecondary from "./ggs-logo-secondary.svg";
import { CSSTransition } from "react-transition-group";

export default function Loading({
  showLoading,
  setShowLoading,
  loadingText,
  loadingTimer,
}) {
  const [ShowTeal, setShowTeal] = useState(true);
  //const [ShowStd, setShowStd] = useState(false);
  const [ShowPink, setShowPink] = useState(false);
  //console.log("loadingTimer received by Loading is " + loadingTimer);
  setTimeout(setShowLoading, loadingTimer, false);
  //console.log("loadingTimer after timeout is " + loadingTimer);

  return (
    <div className={showLoading ? "loading" : "not-loading"}>
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
