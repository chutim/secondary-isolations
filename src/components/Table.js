//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import { cloneDeep } from "lodash";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayedKitData: []
      // cellCountsHash: {}
    };
  }
  // //class variable for generating the cellCountsHash as render is creating the tables. this.state.cellCountsHash gets updated with this variable once component finishes mounting.
  // cellCountsHash = {};

  //allow changing of row order, drag and drop
  //display multipliers next to each reagent so user can double check against kit paper
  componentDidMount = () => {
    const kitDataHash = {};
    for (let kit of this.props.tableKitData) {
      kitDataHash[kit.species] = (kitDataHash[kit.species] || []).concat(kit);
    }
    this.arrayifyKitData(kitDataHash);
    // this.setState({ cellCountsHash: this.props.cellCountsHash });

    this.props.setCellCountsHashToState();
  };

  arrayifyKitData = kitDataHash => {
    let arrayedKitData = [];
    for (let groupSpecies in kitDataHash) {
      const groupArray = [groupSpecies, kitDataHash[groupSpecies]];
      arrayedKitData.push(groupArray);
    }
    this.setState({ arrayedKitData });
  };

  // handleCellCount = (e, species, rowKey) => {
  //   // const cellCountsHash = cloneDeep(this.state.cellCountsHash);
  //   // cellCountsHash[species][rowKey] = e.target.innerHTML;
  //   // this.setState({ cellCountsHash });
  //   // this.props.updateCellCount(species, rowKey, e.target.innerHTML);
  //   // this.props.cellCountsHash[species][rowKey] = e.target.innerHTML;
  // };

  generateRows = kit => {
    let numRows = this.props.tableKitIDs[kit.id];
    const rows = [];

    while (numRows--) {
      const rowID = numRows; //note the row IDs will count down
      const rowKey = kit.id + " " + rowID;

      //insert this new row into the cellCountsHash
      this.props.updateCellCountsHash(kit.species, rowKey);

      rows.push(
        <tr key={rowID}>
          <td contentEditable={true}></td>
          <td
            contentEditable={true}
            onKeyPress={e => {
              if ((e.charCode < 48 && e.charCode !== 46) || e.charCode > 57)
                e.preventDefault();
            }}
            onInput={e =>
              this.props.updateCellCount(
                kit.species,
                rowKey,
                e.target.innerHTML
              )
            }
          ></td>
          {kit.constants.map((constant, idx) => {
            //if the constant is for time or the final wash, just render it
            if (
              constant[0].includes("(min)") ||
              constant[0].includes("Washes")
            ) {
              return <td key={idx}>{constant[1]}</td>;
            }
            //otherwise, multiply the constant by the row's cell count
            return (
              <td key={idx}>
                {(constant[1] *
                  this.props.cellCountsHash[kit.species][rowKey]) /
                  10 || ""}
              </td>
            );
          })}
        </tr>
      );
    }

    return rows;
  };

  // updateCellCountsHash = (species, rowKey) => {
  //   if (!this.cellCountsHash[species]) this.cellCountsHash[species] = {};
  //   this.cellCountsHash[species][rowKey] = undefined;
  // };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Table</h3>
        </header>

        <div className="groups-container" id="divToPrint">
          {/* generate a new table group for each species */}
          {this.state.arrayedKitData.map(speciesGroup => (
            <div className="tables-container" key={speciesGroup[0]}>
              <div className="species-name">{speciesGroup[0]}</div>
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
