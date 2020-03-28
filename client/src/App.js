import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { cloneDeep } from "lodash";
import { Home, Kits, EditKits, Table } from "./components";
import "./App.css";

//THINGS TO DO
//whenever a change happens, upload to localStorage
//set timer with each update, to clear localStorage in 24 hours

// DATA STRUCTURES REFERENCE:
// kit = {
//   id: "130-096-537",
//   name: "Pan Monocyte Isolation Kit",
//   species: "Human",
//   constants: [
//     ["Buffer (µL)", 40],
//     ["FcR Blocking Reagent (µL)", 10],
//     ["Biotin-Antibody Cocktail (µL)", 10],
//     ["Incubation (min)", 5],
//     ["Buffer (µL)", 30],
//     ["Anti-Biotin Microbeads (µL)", 20],
//     ["Incubation (min)", 10],
//     ["Washes (times x mL)", "3 x 3"]
//   ]
// };
// tableKitIDs = { "192-050-201": 2, "190-229-501": 1, "130-096-537": 8 };
// tableKitData = [{ kit1 }, { kit2 }, { kit3 }];
// tableRowsHash = {
//   Human: {
//     "130-096-537 0": ["Human 24", "45.3"],
//     "130-096-537 1": ["Human 25", "21.5"],
//     "130-096-537 2": ["Human 26", "39.2"],
//     "142-829-339 0": ["Human 3", "224.1"]
//   },
//   Mouse: {
//     "120-332-192 0": ["Mouse Pool", "31"]
//   }
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      tableRows: 0,
      currentSpecies: "No Species Selected",
      tableKitIDs: {},
      tableKitData: [],
      tableRowsHash: {}
    };
    this.modifyRows = this.modifyRows.bind(this);
    this.selectSpecies = this.selectSpecies.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.fetchKitData = this.fetchKitData.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.addRowToTableRowsHash = this.addRowToTableRowsHash.bind(this);
    this.setTableRowsHashToState = this.setTableRowsHashToState.bind(this);
    this.deleteSpeciesGroup = this.deleteSpeciesGroup.bind(this);
  }

  //class variable for generating the tableRowsHash as render is creating the tables. this.state.tableRowsHash gets updated with this variable once Table component finishes mounting.
  tableRowsHash = {};

  modifyRows = modification => {
    if (modification === "add")
      this.setState({ tableRows: this.state.tableRows + 1 });
    else if (modification === "remove")
      this.setState({ tableRows: this.state.tableRows - 1 });
  };

  selectSpecies = species => {
    this.setState({ currentSpecies: species });
  };

  updateTable = (modification, kitID) => {
    let tableKitIDs = Object.assign({}, this.state.tableKitIDs);
    if (modification === "add") {
      this.modifyRows(modification);
      tableKitIDs[kitID] = (tableKitIDs[kitID] || 0) + 1;
      this.setState({ tableKitIDs });
      //if the kit quantity is increased to 1, add its data to the tableKitData array
      if (tableKitIDs[kitID] === 1) {
        this.addKitData(kitID);
      }
      console.log("App.js state:", this.state);
    } else if (modification === "remove") {
      if (tableKitIDs[kitID]) {
        this.modifyRows(modification);
        tableKitIDs[kitID]--;
      }
      this.setState({ tableKitIDs });
      //if the kit quantity is zero, remove its data from the tableKitData array
      if (!tableKitIDs[kitID]) {
        this.removeKitData(kitID);
      }
    }
  };

  addKitData = kitID => {
    const kitData = this.fetchKitData(kitID);
    this.setState({
      tableKitData: [...this.state.tableKitData, kitData]
    });
  };

  removeKitData = kitID => {
    const tableKitData = this.state.tableKitData;
    const filteredKitData = tableKitData.filter(kit => kit.id !== kitID);
    this.setState({ tableKitData: filteredKitData });
  };

  fetchKitData = kitID => {
    //fetch from DB based on kitID
    const kitData = {
      id: "130-096-537",
      name: "Pan Monocyte Isolation Kit",
      species: "Human",
      type: "Negative",
      constants: [
        ["Buffer (µL)", "40"],
        ["FcR Blocking Reagent (µL)", "10"],
        ["Biotin-Antibody Cocktail (µL)", "10"],
        ["Incubation (min)", "5"],
        ["Buffer (µL)", "30"],
        ["Anti-Biotin Microbeads (µL)", "20"],
        ["Incubation (min)", "10"],
        ["Washes (times x mL)", "3 x 3"]
      ]
    };
    return kitData;
  };

  addRowToTableRowsHash = (species, rowKey) => {
    if (!this.tableRowsHash[species]) this.tableRowsHash[species] = {};
    this.tableRowsHash[species][rowKey] = [undefined, undefined];
  };

  setTableRowsHashToState = () => {
    if (Object.keys(this.state.tableRowsHash).length === 0) {
      this.setState({ tableRowsHash: this.tableRowsHash });
    }
  };

  updateRowCellCount = (inputType, species, rowKey, input) => {
    const tableRowsHash = cloneDeep(this.state.tableRowsHash);

    if (inputType === "cellCount") {
      tableRowsHash[species][rowKey][1] = input;
    } else if (inputType === "sampleID") {
      tableRowsHash[species][rowKey][0] = input;
    }

    this.setState({ tableRowsHash });
  };

  deleteSpeciesGroup = species => {
    let tableRows = this.state.tableRows;
    const tableKitIDs = cloneDeep(this.state.tableKitIDs);
    let tableKitData = cloneDeep(this.state.tableKitData);
    const tableRowsHash = cloneDeep(this.state.tableRowsHash);

    //grab the number of rows that will be deleted, subtract from tableRows
    const speciesRows = tableRowsHash[species];
    const numRows = Object.keys(speciesRows).length;
    tableRows -= numRows;
    //delete the entire species and its rows from the hash table
    delete tableRowsHash[species];
    //delete kits from the species, from tableKitData array. at the same time, store the IDs of any kits deleted
    let IDs = [];
    tableKitData = tableKitData.filter(kit => {
      if (kit.species !== species) return true;
      IDs.push(kit.id);
      return false;
    });
    //delete kits from tableKitIDs using the IDs grabbed during the modification of tableKitData
    for (let ID of IDs) delete tableKitIDs[ID];

    this.setState({ tableRows, tableKitIDs, tableKitData, tableRowsHash });
  };

  clearTable = () => {
    this.setState({
      tableRows: 0,
      tableKitIDs: {},
      tableKitData: [],
      tableRowsHash: {}
    });
  };

  render() {
    return (
      <Router className="main">
        <Switch>
          <Route
            path="/kits"
            render={props => (
              <Kits
                {...props}
                currentSpecies={this.state.currentSpecies}
                tableRows={this.state.tableRows}
                tableKitIDs={this.state.tableKitIDs}
                updateTable={this.updateTable}
              />
            )}
          ></Route>
          <Route
            path="/editkits"
            render={props => <EditKits {...props} />}
          ></Route>
          <Route
            path="/table"
            render={props => (
              <Table
                {...props}
                tableKitIDs={this.state.tableKitIDs}
                tableKitData={this.state.tableKitData}
                tableRowsHash={this.state.tableRowsHash}
                selectSpecies={this.selectSpecies}
                updateTable={this.updateTable}
                addRowToTableRowsHash={this.addRowToTableRowsHash}
                updateRowCellCount={this.updateRowCellCount}
                setTableRowsHashToState={this.setTableRowsHashToState}
                deleteSpeciesGroup={this.deleteSpeciesGroup}
                clearTable={this.clearTable}
              />
            )}
          ></Route>
          <Route
            path="/"
            exact={true}
            render={props => (
              <Home
                {...props}
                tableRows={this.state.tableRows}
                selectSpecies={this.selectSpecies}
              />
            )}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
