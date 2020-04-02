import React from "react";
import "./Error.css";

const Error = props => {
  return (
    <>
      <div>You are not logged in.</div>
      <button
        className="nav-button"
        onClick={() => {
          props.history.goBack();
        }}
      >
        Back
      </button>
    </>
  );
};

export default Error;
