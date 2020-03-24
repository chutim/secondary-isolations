//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

class Table extends Component {
  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Table</h3>
        </header>

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
