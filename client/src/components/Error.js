import React from "react";
import Footer from "./Footer";
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

        <div className="error-text">Please log in for full access.</div>
      </div>

      <Footer {...props} currComponent={"Error"} />
    </div>
  );
};

export default Error;
