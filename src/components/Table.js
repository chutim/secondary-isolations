//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupedKitData: {}
    };
  }
  //allow changing of row order, drag and drop
  //display multipliers next to each reagent so user can double check against kit paper
  componentDidMount = () => {
    const tableKitData = this.props.tableKitData;
    console.log("Table props:", tableKitData);
    const groupedKitData = {};
    for (let kit of tableKitData) {
      groupedKitData[kit.species] = (groupedKitData[kit.species] || []).concat(
        kit
      );
    }
    console.log("groupedKitData:", groupedKitData);
    this.setState({ groupedKitData });
  };
  render() {
    console.log("Table state:", this.state);
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Table</h3>
        </header>
        <div className="groupss-container">
          {/* generate a new table group for each species */}
          {this.state.groupedKitData.map(species => (
            <div className="tables-container" key={species}></div>
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
