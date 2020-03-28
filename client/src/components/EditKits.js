import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./EditKits.css";

class EditKits extends Component {
  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Edit Kits</h3>
        </header>
        <footer>
          <button
            className="nav-button"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </button>
          <LinkButton to="/" className="nav-button home-button">
            Home
          </LinkButton>
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.tableRows} Samples&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}

export default EditKits;
