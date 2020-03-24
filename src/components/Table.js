//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayedKitData: []
    };
  }
  //allow changing of row order, drag and drop
  //display multipliers next to each reagent so user can double check against kit paper
  componentDidMount = () => {
    const kitDataHash = {};
    for (let kit of this.props.tableKitData) {
      kitDataHash[kit.species] = (kitDataHash[kit.species] || []).concat(kit);
    }

    this.arrayifyKitData(kitDataHash);
  };
  //note edge case where you delete something from Table, but because all of that logic above is in componentDidMount, it won't run again and update Table's state

  arrayifyKitData = kitDataHash => {
    let arrayedKitData = [];
    for (let groupSpecies in kitDataHash) {
      const groupObj = {
        [groupSpecies]: kitDataHash[groupSpecies]
      };
      arrayedKitData.push(groupObj);
    }
    this.setState({ arrayedKitData });
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Table</h3>
        </header>

        <div className="groups-container">
          {/* generate a new table group for each species */}
          {this.state.arrayedKitData.map(species => (
            <div className="tables-container" key={species}>
              <div className="species-name">{Object.keys(species)}</div>
              <table></table>
            </div>
          ))}
        </div>

        <footer>
          <button
            className="nav-button clear-table-button"
            onClick={() => {
              this.props.clearTable();
            }}
          >
            Clear Table
          </button>
          <LinkButton to="/" className="nav-button home-button">
            Home
          </LinkButton>
        </footer>
      </div>
    );
  }
}
export default Table;
