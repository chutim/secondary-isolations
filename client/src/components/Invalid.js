import React from "react";
import Footer from "./Footer";
import "./Invalid.css";

const Invalid = (props) => {
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

        <div className="error-text">PLEASE log in for full site access.</div>
      </div>

      <Footer {...props} currComponent={"Error"} />
    </div>
  );
};

export default Invalid;
