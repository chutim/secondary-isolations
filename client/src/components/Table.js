//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear table" button is provided to clear the Table. if the user is logged in, 'edit' buttons are rendered on each kit.
import React from "react";
import LinkButton from "./LinkButton.jsx";
import Footer from "./Footer";
import "./Table.css";

//THINGS TO DO:

const Table = (props) => {
  const generateSampleCells = (sampleRow, kit, rowIdx) => {
    const cells = [];
    sampleRow.forEach((cell, idx) => {
      if (idx === 0) {
        cells.push(
          <td className="medium-cell">
            <input
              className="user-input medium-cell"
              onChange={(e) =>
                props.updateRowCellCount(
                  "sampleID",
                  kit,
                  rowIdx,
                  e.target.value
                )
              }
              value={cell}
            ></input>
          </td>
        );
      } else if (idx === 1) {
        cells.push(
          <td className="short-cell">
            <input
              className="user-input short-cell"
              // only allow numbers and decimals
              onKeyPress={(e) => {
                if ((e.charCode < 48 && e.charCode !== 46) || e.charCode > 57)
                  e.preventDefault();
              }}
              onChange={(e) =>
                props.updateRowCellCount(
                  "cellCount",
                  kit,
                  rowIdx,
                  e.target.value
                )
              }
              value={cell}
            ></input>
          </td>
        );
      } else {
        cells.push(<td>{cell}</td>);
      }
    });
    return cells;
  };

  const generateSampleRows = (kit) => {
    const sampleRows = kit.samples;
    return sampleRows.map((row, idx) => (
      <tr className="table-variables-row" key={idx}>
        {generateSampleCells(row, kit, idx)}
      </tr>
    ));
  };

  const generateKitTables = (speciesKits) => {
    let kitsTables = [];
    for (let kitID in speciesKits) {
      const kit = speciesKits[kitID];
      kitsTables.push(
        <table className="kit-table">
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
                      props.loggedIn
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
                      props.deleteKitFromTable(kit.id, kit.species)
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
                <th key={idx}>{constant[0] + " (" + constant[1] + ")"}</th>
              ))}
            </tr>
          </thead>

          <tbody>{generateSampleRows(kit)}</tbody>

          <tfoot className="no-print">
            <tr>
              <td colSpan={kit.constants.length + 2}>
                <div className="kit-table-footer">
                  <button
                    className="kit-table-row-button add-button"
                    onClick={() => props.updateTable("add", kit)}
                  >
                    Add Sample
                  </button>

                  <button
                    className="kit-table-row-button subtract-button"
                    onClick={() => props.updateTable("subtract", kit)}
                  >
                    Remove Sample
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      );
    }
    return kitsTables;
  };

  const generateSpeciesTables = () => {
    let speciesTables = [];
    const tableData = props.tableData;
    for (let speciesGroup in tableData) {
      speciesTables.push(
        <div className="tables-container">
          <div className="tables-header">
            <div className="tables-header-spacer"></div>

            <LinkButton
              to="/kits"
              className="species-name"
              onClick={() => props.selectSpecies(speciesGroup)}
            >
              {speciesGroup}
            </LinkButton>

            <button
              className="delete-button delete-species no-print-spacer"
              onClick={() => props.deleteSpeciesFromTable(speciesGroup)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          {/* generate a table for each kit in the species group */}
          {generateKitTables(tableData[speciesGroup])}
        </div>
      );
    }
    return speciesTables;
  };

  return (
    <div className="page">
      <div className="scrollable-body" id="divToPrint">
        {generateSpeciesTables()}
      </div>

      <Footer {...props} currComponent={"Table"} />
    </div>
  );
};
export default Table;
