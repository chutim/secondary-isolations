import React from "react";
import LinkButton from "./LinkButton.jsx";
import "./Footer.css";

const Footer = (props) => {
  return (
    <div className="footer">
      {props.currComponent !== "Home" ? (
        <button
          className="nav-button back-button"
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </button>
      ) : null}

      {props.currComponent !== "Home" ? (
        <LinkButton to="/" className="nav-button home-button">
          Home
        </LinkButton>
      ) : null}

      {props.currComponent === "Home" || props.currComponent === "Kits" ? (
        <LinkButton
          to="/create"
          id={
            props.loggedIn
              ? "create-button-faded-in"
              : "create-button-faded-out"
          }
        >
          Create Kit
        </LinkButton>
      ) : null}

      {props.currComponent !== "Table" ? (
        <LinkButton to="/table" className="nav-button table-button">
          Table &#40;{props.rowCount}{" "}
          {props.rowCount === 1 ? "Sample" : "Samples"}&#41;
        </LinkButton>
      ) : null}

      {props.currComponent === "Table" ? (
        <button
          className="nav-button clear-table-button"
          onClick={() => {
            props.clearTable();
          }}
        >
          Clear Table
        </button>
      ) : null}

      {props.currComponent === "Table" ? (
        <button
          className="nav-button print-button"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
      ) : null}
    </div>
  );
};

export default Footer;
