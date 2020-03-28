//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import { cloneDeep } from "lodash";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

//THINGS TO DO:
//allow changing of row order, drag and drop
//display multipliers next to each reagent so user can double check against kit paper
//'delete kit' button next to each kit
//'delete row' button next to each row
//'add new row' button next to each type of kit

class Table extends Component {
  generateRows = kit => {
    const numRows = this.props.tableKitIDs[kit.id];
    let row = 1;
    const rows = [];

    while (row <= numRows) {
      const rowID = row;
      const rowKey = kit.id + " " + rowID;

      rows.push(
        <tr key={rowID}>
          <td className="user-input-cell">
            <input
              className="user-input"
              onChange={e =>
                this.props.updateRowCellCount(
                  "sampleID",
                  kit.species,
                  rowKey,
                  e.target.value
                )
              }
              value={this.props.tableRowsHash[kit.species][rowKey][0] || ""}
            ></input>
          </td>
          <td className="user-input-cell">
            <input
              className="user-input"
              // only allow numbers and decimals
              onKeyPress={e => {
                if ((e.charCode < 48 && e.charCode !== 46) || e.charCode > 57)
                  e.preventDefault();
              }}
              onChange={e =>
                this.props.updateRowCellCount(
                  "cellCount",
                  kit.species,
                  rowKey,
                  e.target.value
                )
              }
              value={this.props.tableRowsHash[kit.species][rowKey][1] || ""}
            ></input>
          </td>
          {kit.constants.map((constant, idx) => {
            //if the constant is for time, a spin, or the final wash, just render it
            if (
              constant[0].includes("(min)") ||
              constant[0].includes("(times x mL)") ||
              constant[0].includes("(g x min)")
            ) {
              return <td key={idx}>{constant[1]}</td>;
            }
            //otherwise, multiply the constant by the row's cell count
            return (
              <td key={idx}>
                {(Number(constant[1]) *
                  this.props.tableRowsHash[kit.species][rowKey][1]) /
                  10 || ""}
              </td>
            );
          })}
        </tr>
      );
      ++row;
    }

    return rows;
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Table</h3>
        </header>

        <div className="groups-container" id="divToPrint">
          {/* generate a new table group for each species */}
          {this.props.arrayedKitData.map(speciesGroup => (
            <div className="tables-container" key={speciesGroup[0]}>
              <div className="tables-header">
                <div></div>
                <LinkButton
                  to="/kits"
                  className="species-name"
                  onClick={() => this.props.selectSpecies(speciesGroup[0])}
                  key={speciesGroup[0]}
                >
                  {speciesGroup[0]}
                </LinkButton>
                <button
                  className="delete-button delete-species no-print"
                  onClick={() => this.props.deleteSpeciesGroup(speciesGroup[0])}
                >
                  x
                </button>
              </div>
              {/* generate a table for each kit in the species group */}
              {speciesGroup[1].map(kit => (
                <table className="kit-table" key={kit.id}>
                  <thead>
                    <tr>
                      <th
                        className="kit-table-subtitle"
                        colSpan={kit.constants.length + 2}
                      >
                        {kit.name}: {kit.id}
                      </th>
                    </tr>
                    <tr>
                      <th>Sample ID</th>
                      <th>
                        Cell Count (10<sup>6</sup>)
                      </th>
                      {/* using idx for the keys because constants can repeat */}
                      {kit.constants.map((constant, idx) => (
                        <th key={idx}>{constant[0]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{this.generateRows(kit)}</tbody>
                </table>
              ))}
            </div>
          ))}
        </div>

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
          <button
            className="nav-button clear-table-button"
            onClick={() => {
              this.props.clearTable();
              this.setState({ arrayedKitData: [] });
            }}
          >
            Clear Table
          </button>
          <button
            className="nav-button"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </button>
        </footer>
      </div>
    );
  }
}
export default Table;
