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
        <tr className="table-variables-row" key={rowID}>
          <td className="medium-cell">
            <input
              className="user-input medium-cell"
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
          <td className="short-cell">
            <input
              className="user-input short-cell"
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
            if (constant[3] === "n/a") {
              return <td key={idx}>{constant[2]}</td>;
            }
            //otherwise, convert the cell count multiplier into 10^n, and divide the product of the cell count and constants by it
            const cellMultiplier =
              10 ** ((constant[3] && constant[3].slice(3)) - 6); //6 corresponds to 10^6
            let multiplied =
              (Number(constant[2]) *
                this.props.tableRowsHash[kit.species][rowKey][1]) /
              cellMultiplier;
            if (multiplied > 50000) multiplied = 50000;
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
        <div className="scrollable-body" id="divToPrint">
          {/* generate a new table group for each species */}
          {this.props.arrayedKitData.map(speciesGroup => (
            <div className="tables-container" key={speciesGroup[0]}>
              <div className="tables-header">
                <div className="tables-header-spacer"></div>
                <LinkButton
                  to="/kits"
                  className="species-name"
                  onClick={() => this.props.selectSpecies(speciesGroup[0])}
                  key={speciesGroup[0]}
                >
                  {speciesGroup[0]}
                </LinkButton>
                <button
                  className="delete-button delete-species no-print-spacer"
                  onClick={() =>
                    this.props.deleteSpeciesFromTable(speciesGroup[0])
                  }
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
              {/* generate a table for each kit in the species group */}
              {speciesGroup[1].map(kit => (
                <table className="kit-table" key={kit.id}>
                  <thead>
                    <tr>
                      <th
                        className="kit-table-header-container"
                        colSpan={kit.constants.length + 2}
                      >
                        <div className="kit-table-header">
                          <LinkButton
                            to={`/edit/${kit.id}`}
                            className={
                              this.props.loggedIn
                                ? "edit-button no-print-spacer"
                                : "edit-button logged-out-edit-button"
                            }
                            //attaches kit object to props.location.state
                            kit={kit}
                          >
                            <i className="fas fa-pen"></i>
                          </LinkButton>
                          <div className="kit-table-header-text-container">
                            <div className="kit-table-header-name">
                              {kit.name}:{" "}
                              <a
                                className="kit-table-header-id"
                                href={`https://www.miltenyibiotec.com/US-en/search.html?search=${kit.id}&options=on#globalSearchFamilies=%5B%5D`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {kit.id}
                              </a>
                            </div>
                            <div className="kit-table-header-selection">
                              ({kit.type} Selection)
                            </div>
                          </div>
                          <button
                            className="delete-button delete-kit no-print-spacer"
                            onClick={() =>
                              this.props.deleteKitFromTable(kit.id, kit.species)
                            }
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </th>
                    </tr>
                    <tr className="kit-multipliers-row no-print">
                      <th className="kit-constants-title" colSpan={2}>
                        Constants:
                      </th>
                      {/* using idx for the keys because constants can repeat */}
                      {kit.constants.map((constant, idx) => (
                        <th key={idx}>{constant[2]}</th>
                      ))}
                    </tr>
                    <tr className="kit-constant-names-row">
                      <th className="medium-cell">Sample ID</th>
                      <th className="short-cell superscript-cell">
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
                            className="kit-table-row-button add-button"
                            onClick={() => this.props.updateTable("add", kit)}
                          >
                            Add Sample
                          </button>
                          <button
                            className="kit-table-row-button subtract-button"
                            onClick={() =>
                              this.props.updateTable("subtract", kit)
                            }
                          >
                            Remove Sample
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
          <button
            className="nav-button clear-table-button"
            onClick={() => {
              this.props.clearTable();
            }}
          >
            Clear Table
          </button>
          <button
            className="nav-button print-button"
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
