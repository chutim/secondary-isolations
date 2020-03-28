//the Kits component lists all positive & negative kits for the selected species, and allows user to add kits to the Table, to edit/create kits, to go Home, and to go to the Table. the number of kits currently in the Table is displayed.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Kits.css";

//THINGS TO DO

class Kits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positiveKits: [],
      negativeKits: []
    };
  }

  componentDidMount = async () => {
    const positiveKits = [];
    const negativeKits = [];
    for (let kit of this.props.currentKits) {
      if (kit.type === "Positive") positiveKits.push(kit);
      else if (kit.type === "Negative") negativeKits.push(kit);
    }
    this.setState({ positiveKits, negativeKits });
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
              {this.state.positiveKits.map(kit => (
                <div className="kit-info-container" key={kit.id}>
                  <div className="kit-name-container">
                    <b>{kit.name}</b>
                    <div>{kit.id}</div>
                  </div>
                  <div className="kit-options-container">
                    <button
                      className="kit-options-button kit-remove-button"
                      onClick={() => {
                        this.props.updateTable("remove", kit.id);
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
                        this.props.updateTable("add", kit.id);
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
              {this.state.negativeKits.map(kit => (
                <div className="kit-info-container" key={kit.id}>
                  <div className="kit-name-container">
                    <b>{kit.name}</b>
                    <div>{kit.id}</div>
                  </div>
                  <div className="kit-options-container">
                    <button
                      className="kit-options-button kit-remove-button"
                      onClick={() => {
                        this.props.updateTable("remove", kit.id);
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
                        this.props.updateTable("add", kit.id);
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
          <LinkButton to="/editkits" className="nav-button">
            Edit Kits
          </LinkButton>
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.tableRows} Kits&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}
export default Kits;
