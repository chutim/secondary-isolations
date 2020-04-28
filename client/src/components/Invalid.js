//the Invalid component is shown whenever an invalid URL is accessed, or when the user types in the URL to edit a kit that doesn't exist.
import React from "react";
import Footer from "./Footer";
import "./Invalid.css";

const Invalid = (props) => {
  return (
    <div className="page">
      <div className="invalid-container">
        <div className="search-icon">
          <div className="search-head"></div>
          <div className="search-neck"></div>
          <div className="search-handle"></div>
        </div>

        <div className="error-text invalid-text">Page could not be found.</div>
      </div>

      <Footer {...props} currComponent={"Error"} />
    </div>
  );
};

export default Invalid;
