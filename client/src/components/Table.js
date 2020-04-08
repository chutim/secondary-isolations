//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear table" button is provided to clear the Table. if the user is logged in, 'edit' buttons are rendered on each kit.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

//THINGS TO DO:

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
              constant[1].includes("min") ||
              constant[1].includes("times x mL") ||
              constant[1].includes("g x min")
            ) {
              return <td key={idx}>{constant[2]}</td>;
            }
            //otherwise, multiply the constant by the row's cell count. divide by 10 because the kit instructions use cell counts of 10^7
            const multiplied =
              (Number(constant[2]) *
                this.props.tableRowsHash[kit.species][rowKey][1]) /
              10;
            return (
              <td key={idx}>
                {multiplied
                  ? multiplied.toLocaleString("en", { useGrouping: true })
                  : ""}
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
        <div className="groups-container scrollable-body" id="divToPrint">
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
                  onClick={() =>
                    this.props.deleteSpeciesFromTable(speciesGroup[0])
                  }
                >
                  x
                </button>
              </div>
              {/* generate a table for each kit in the species group */}
              {speciesGroup[1].map(kit => (
                <table className="kit-table" key={kit.id}>
                  <thead>
                    <tr>
                      <th colSpan={kit.constants.length + 2}>
                        <div className="kit-table-title">
                          <LinkButton
                            to={`/edit/${kit.id}`}
                            className={
                              this.props.loggedIn
                                ? "nav-button no-print"
                                : "logged-out"
                            }
                            //attaches kit object to props.location.state
                            kit={kit}
                          >
                            Edit Kit
                          </LinkButton>
                          <div>
                            <div>
                              {kit.name}:{" "}
                              <a
                                href={`https://www.miltenyibiotec.com/US-en/search.html?search=${kit.id}&options=on#globalSearchFamilies=%5B%5D`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {kit.id}
                              </a>
                            </div>
                            <div>({kit.type} Selection)</div>
                          </div>
                          <button
                            className="delete-button delete-kit no-print"
                            onClick={() =>
                              this.props.deleteKitFromTable(kit.id, kit.species)
                            }
                          >
                            x
                          </button>
                        </div>
                      </th>
                    </tr>
                    <tr className="kit-multipliers-row">
                      <th colSpan={2}>Constants:</th>
                      {/* using idx for the keys because constants can repeat */}
                      {kit.constants.map((constant, idx) => (
                        <th key={idx}>{constant[2]}</th>
                      ))}
                    </tr>
                    <tr>
                      <th>Sample ID</th>
                      <th>
                        Cell Count (10<sup>6</sup>)
                      </th>
                      {/* using idx for the keys because constants can repeat */}
                      {kit.constants.map((constant, idx) => (
                        <th key={idx}>
                          {constant[0] + " (" + constant[1] + ")"}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{this.generateRows(kit)}</tbody>
                  <tfoot className="no-print">
                    <tr>
                      <td colSpan={kit.constants.length + 2}>
                        <div className="kit-table-footer">
                          <button
                            className="kit-table-row-button add-row-button"
                            onClick={() => this.props.updateTable("add", kit)}
                          >
                            Add Row
                          </button>
                          <button
                            className="kit-table-row-button subtract-row-button"
                            onClick={() =>
                              this.props.updateTable("subtract", kit)
                            }
                          >
                            Subtract Row
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
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
