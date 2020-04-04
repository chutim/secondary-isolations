//the Kits component lists all positive & negative kits for the selected species, and allows user to add kits to the Table, to edit/create kits, to go Home, and to go to the Table. the number of kits currently in the Table is displayed.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Kits.css";

//THINGS TO DO

class Kits extends Component {
  sortKitsByName = kitArray => {
    return kitArray.sort((a, b) => {
      const aName = a.name.toUpperCase();
      const bName = b.name.toUpperCase();
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">{this.props.currentSpecies}</h3>
        </header>
        <div className="kits-body">
          <div className="kit-section section-positive-selection">
            <h5 className="kit-section-title">Positive Selection</h5>
            <div className="kit-section-list">
              {this.props.currentPosKits &&
                this.sortKitsByName(this.props.currentPosKits).map(kit => (
                  <div className="kit-info-container" key={kit.id}>
                    <div className="kit-name-container">
                      <b>{kit.name}</b>
                      <div>{kit.id}</div>
                    </div>
                    <LinkButton
                      to={`/edit/${kit.id}`}
                      className={
                        this.props.loggedIn ? "nav-button" : "logged-out"
                      }
                      //attaches kit object to props.location.state
                      kit={kit}
                    >
                      Edit Kit
                    </LinkButton>
                    <div className="kit-options-container">
                      <button
                        className="kit-options-button kit-remove-button"
                        onClick={() => {
                          this.props.updateTable("subtract", kit);
                        }}
                      >
                        <b>-</b>
                      </button>
                      <div className="kit-count">
                        {this.props.tableKitIDs[kit.id] || 0}
                      </div>
                      <button
                        className="kit-options-button kit-add-button"
                        onClick={() => {
                          this.props.updateTable("add", kit);
                        }}
                      >
                        <b>+</b>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="kit-section section-negative-selection">
            <h5 className="kit-section-title">Negative Selection</h5>
            <div className="kit-section-list">
              {this.props.currentNegKits &&
                this.sortKitsByName(this.props.currentNegKits).map(kit => (
                  <div className="kit-info-container" key={kit.id}>
                    <div className="kit-name-container">
                      <b>{kit.name}</b>
                      <div>{kit.id}</div>
                    </div>
                    <LinkButton
                      to={`/edit/${kit.id}`}
                      className={
                        this.props.loggedIn ? "nav-button" : "logged-out"
                      }
                      //attaches kit object to props.location.state
                      kit={kit}
                    >
                      Edit Kit
                    </LinkButton>
                    <div className="kit-options-container">
                      <button
                        className="kit-options-button kit-remove-button"
                        onClick={() => {
                          this.props.updateTable("subtract", kit);
                        }}
                      >
                        <b>-</b>
                      </button>
                      <div className="kit-count">
                        {this.props.tableKitIDs[kit.id] || 0}
                      </div>
                      <button
                        className="kit-options-button kit-add-button"
                        onClick={() => {
                          this.props.updateTable("add", kit);
                        }}
                      >
                        <b>+</b>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <footer>
          <LinkButton to="/" className="nav-button home-button">
            Home
          </LinkButton>

          <LinkButton
            to="/create"
            className={this.props.loggedIn ? "nav-button" : "logged-out"}
          >
            Create Kit
          </LinkButton>
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.rowCount} Samples&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}
export default Kits;
