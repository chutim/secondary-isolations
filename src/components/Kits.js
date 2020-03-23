//the Kits component lists all positive & negative kits for the selected species, and allows user to add kits to the Table, to edit/create kits, to go Home, and to go to the Table. the number of kits currently in the Table is displayed.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Kits.css";

class Kits extends Component {
  render() {
    return (
      <div>
        <div>kits</div>
        <button
          onClick={() => {
            this.props.functionModifyRows("increment");
          }}
        >
          increment
        </button>
        <button
          onClick={() => {
            this.props.functionModifyRows("decrement");
          }}
        >
          decrement
        </button>
        <LinkButton to="/" className="kits-home-button">
          Home
        </LinkButton>
      </div>
    );
  }
}
export default Kits;
