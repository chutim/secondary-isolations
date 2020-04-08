//the Kits component lists all positive & negative kits for the selected species, and allows user to add kits to the Table and modify the number of samples for each kit. if the user is logged in, 'edit' buttons are visible for each kit, as well as a 'create kit' button on the page.
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
          <div className="page-title">{this.props.currentSpecies} Kits</div>
        </header>
        <div className="kits-body scrollable-body">
          <div className="kit-section section-positive-selection">
            <div className="kit-section-title">Positive Selection</div>
            <div className="kit-section-list">
              {this.props.currentPosKits &&
                this.sortKitsByName(this.props.currentPosKits).map(kit => (
                  <div className="kit-info-container" key={kit.id}>
                    <div className="kit-name-container">
                      <div className="kit-name">{kit.name}</div>
                      <div>
                        <a
                          className="kit-id"
                          href={`https://www.miltenyibiotec.com/US-en/search.html?search=${kit.id}&options=on#globalSearchFamilies=%5B%5D`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {kit.id}
                        </a>
                      </div>
                    </div>
                    <div className="kit-info-container-right">
                      <LinkButton
                        to={`/edit/${kit.id}`}
                        className={
                          this.props.loggedIn
                            ? "edit-button"
                            : "edit-button logged-out-edit-button"
                        }
                        //attaches kit object to props.location.state
                        kit={kit}
                      >
                        <i class="fas fa-pen"></i>
                      </LinkButton>
                      <div className="kit-options-container">
                        {/* <div className="kit-options-title">Samples</div> */}
                        <div className="kit-options-row">
                          <button
                            className="kit-options-button kit-remove-button"
                            onClick={() => {
                              this.props.updateTable("subtract", kit);
                            }}
                          >
                            <div className="kits-add-subtract-text">-</div>
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
                            <div className="kits-add-subtract-text">+</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="kit-section section-negative-selection">
            <div className="kit-section-title">Negative Selection</div>
            <div className="kit-section-list">
              {this.props.currentNegKits &&
                this.sortKitsByName(this.props.currentNegKits).map(kit => (
                  <div className="kit-info-container" key={kit.id}>
                    <div className="kit-name-container">
                      <div className="kit-name">{kit.name}</div>
                      <div>
                        <a
                          className="kit-id"
                          href={`https://www.miltenyibiotec.com/US-en/search.html?search=${kit.id}&options=on#globalSearchFamilies=%5B%5D`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {kit.id}
                        </a>
                      </div>
                    </div>
                    <div className="kit-info-container-right">
                      <LinkButton
                        to={`/edit/${kit.id}`}
                        className={
                          this.props.loggedIn
                            ? "edit-button"
                            : "edit-button logged-out-edit-button"
                        }
                        //attaches kit object to props.location.state
                        kit={kit}
                      >
                        <i class="fas fa-pen"></i>
                      </LinkButton>
                      <div className="kit-options-container">
                        {/* <div className="kit-options-title">Samples</div> */}
                        <div className="kit-options-row">
                          <button
                            className="kit-options-button kit-remove-button"
                            onClick={() => {
                              this.props.updateTable("subtract", kit);
                            }}
                          >
                            <div className="kits-add-subtract-text">-</div>
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
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <footer>
          <button
            className="nav-button back-button"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </button>
          <LinkButton to="/" className="nav-button home-button">
            Home
          </LinkButton>
          <LinkButton
            to="/create"
            id={this.props.loggedIn ? "fadedIn" : "fadedOut"}
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
