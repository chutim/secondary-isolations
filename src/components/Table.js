//the Table component displays all of the kits selected and allows the user to input sample IDs and cell counts to generate the corresponding constants. the Table can then be printed. a "clear" button is provided to clear the Table, which will also auto-clear in 24 hours.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Table.css";

class Table extends Component {
  render() {
    return (
      <div className="table">
        <header>
          <h3 className="page-title">Table</h3>
        </header>
        <LinkButton to="/" className="nav-button home-button">
          Home
        </LinkButton>
      </div>
    );
  }
}
export default Table;

// id: "130-096-537",
// name: "Pan Monocyte Isolation Kit",
//         constants: [
//           { "Buffer (µL)": 40 },
//           { "FcR Blocking Reagent (µL)": 10 },
//           { "Biotin-Antibody Cocktail (µL)": 10 },
//           { "Incubation (min)": 5 },
//           { "Buffer (µL)": 30 },
//           { "Anti-Biotin Microbeads (µL)": 20 },
//           { "Incubation (min)": 10 }
//         ],
//         washes: "3 x 3"
