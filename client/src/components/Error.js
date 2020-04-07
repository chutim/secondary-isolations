import React from "react";
import LinkButton from "./LinkButton.jsx";
import "./Error.css";

const Error = () => {
  return (
    <>
      <div>You are not logged in.</div>
      <LinkButton to="/" className="nav-button home-button">
        Home
      </LinkButton>
    </>
  );
};

export default Error;
