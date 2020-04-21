import React from "react";
import LinkButton from "./LinkButton.jsx";
import "./Error.css";

const Error = (props) => {
  return (
    <div className="page">
      <div className="error-container">
        <div className="lock-icon">
          <div className="lock-loop"></div>
          <div className="lock-body">
            <div className="lock-hole-top"></div>
            <div className="lock-hole-bottom"></div>
          </div>
        </div>

        <div className="error-text">Please log in for full site access.</div>
      </div>
      <footer>
        <button
          className="nav-button back-button"
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </button>

        <LinkButton to="/" className="nav-button home-button">
          Home
        </LinkButton>

        <LinkButton to="/table" className="nav-button table-button">
          Table &#40;{props.rowCount}{" "}
          {props.rowCount === 1 ? "Sample" : "Samples"}&#41;
        </LinkButton>
      </footer>
    </div>
  );
};

export default Error;
