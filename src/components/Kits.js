//the Kits component lists all positive & negative kits for the selected species, and allows user to add kits to the Table, to edit/create kits, to go Home, and to go to the Table. the number of kits currently in the Table is displayed.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Kits.css";

class Kits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSpecies: this.props.currentSpecies,
      positiveKits: [],
      negativeKits: []
    };
  }

  componentDidMount = () => {
    //these will be fetched from the db. consider fetching the entire kit data to be passed up to App.js. therefore only one read from the db total, as opposed to once here and once again in App.js when a new kit is added
    const positiveKits = [{ id: "130-050-201", name: "CD14 Microbeads" }];
    const negativeKits = [
      { id: "130-096-537", name: "Pan Monocyte Isolation Kit" },
      { id: "130-096-533", name: "CD4 T Cell Isolation Kit" },
      { id: "130-096-533", name: "CD4 T Cell Isolation Kit" },
      { id: "130-096-533", name: "CD4 T Cell Isolation Kit" },
      { id: "130-096-533", name: "CD4 T Cell Isolation Kit" },
      { id: "130-096-533", name: "CD4 T Cell Isolation Kit" },
      { id: "130-096-533", name: "CD4 T Cell Isolation Kit" }
    ];

    this.setState({ positiveKits, negativeKits });
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">{this.state.currentSpecies}</h3>
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
                      className="kit-options-button kit-add-button"
                      onClick={() => {
                        this.props.updateTable("add", kit.id);
                      }}
                    >
                      <b>+</b>
                    </button>
                    <div className="kit-count">
                      {this.props.tableKitIDs[kit.id] || 0}
                    </div>
                    <button
                      className="kit-options-button kit-remove-button"
                      onClick={() => {
                        this.props.updateTable("remove", kit.id);
                      }}
                    >
                      <b>-</b>
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
                      className="kit-options-button kit-add-button"
                      onClick={() => {
                        this.props.updateTable("add", kit.id);
                      }}
                    >
                      <b>+</b>
                    </button>
                    <div className="kit-count">
                      {this.props.tableKitIDs[kit.id] || 0}
                    </div>
                    <button
                      className="kit-options-button kit-remove-button"
                      onClick={() => {
                        this.props.updateTable("remove", kit.id);
                      }}
                    >
                      <b>-</b>
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
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.tableRows} Kits&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}
export default Kits;
