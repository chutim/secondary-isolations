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
    //these will be fetched from the db
    const positiveKits = [{ id: "130-050-201", name: "CD14 Microbeads" }];
    const negativeKits = [
      { id: "130-096-537", name: "Pan Monocyte Isolation Kit" },
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
            <h5>Positive Selection</h5>
            {this.state.positiveKits.map(kit => (
              <div className="kit-info-container" key={kit.id}>
                <div>
                  <b>{kit.name}</b> {kit.id}
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
                  <div>{this.props.tableKitIDs[kit.id] || 0}</div>
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
          <div className="kit-section section-negative-selection">
            <h5>Negative Selection</h5>
            {this.state.negativeKits.map(kit => (
              <div className="kit-info-container" key={kit.id}>
                <div>
                  <b>{kit.name}</b> {kit.id}
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
                  <div>{this.props.tableKitIDs[kit.id] || 0}</div>
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
