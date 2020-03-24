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
    const positiveKits = ["130-050-201"];
    const negativeKits = ["130-096-537", "130-096-533"];

    this.setState({ positiveKits, negativeKits });
  };

  addKit = kitID => {
    this.props.updateTable("increase", kitID);
  };

  removeKit = kitID => {
    this.props.updateTable("decrease", kitID);
  };

  render() {
    return (
      <div>
        <header>
          <h3 className="page-title">{this.state.currentSpecies}</h3>
        </header>
        <div className="section-positive-selection">
          {this.state.positiveKits.map(kitID => (
            <div className="kit-options-container">
              <div>{kitID}</div>
              <button
                className="kit-options-button kit-add-button"
                onClick={() => {
                  this.addKit(kitID);
                }}
              >
                Increase
              </button>
              <button
                className="kit-options-button kit-remove-button"
                onClick={() => {
                  this.removeKit(kitID);
                }}
              >
                Decrease
              </button>
            </div>
          ))}
        </div>
        <div className="section-negative-selection">
          {this.state.negativeKits.map(kitID => (
            <div className="kit-options-container">
              <div>{kitID}</div>
              <button
                className="kit-options-button kit-add-button"
                onClick={() => {
                  this.addKit(kitID);
                }}
              >
                Increase
              </button>
              <button
                className="kit-options-button kit-remove-button"
                onClick={() => {
                  this.removeKit(kitID);
                }}
              >
                Decrease
              </button>
            </div>
          ))}
        </div>

        <footer>
          <LinkButton to="/" className="nav-button kits-home-button">
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

// id: "130-096-537",
// name: "Pan Monocyte Isolation Kit",
//         constants: [
//           { "Buffer (µL)": 40 },
//           { "FcR Blocking Reagent (µL)": 10 },
//           { "Biotin-Antibody Cocktail (µL)": 10 },
//           { "Incubation (min)": 5 },
//           { "Buffer (µL)": 30 },
//           { "Anti-Biotin Microbeads (µL)": 20 },
//           { "Incubation (min)": 10 }
//         ],
//         washes: "3 x 3"
