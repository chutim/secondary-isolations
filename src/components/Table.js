//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

class Table extends Component {
  render() {
    return (
      <div>
        <div>table</div>
        <LinkButton to="/" className="nav-button kits-home-button">
          Home
        </LinkButton>
      </div>
    );
  }
}
export default Table;
