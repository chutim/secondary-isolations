import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from "./logo.svg";
import { Home, Kits, Table } from "./components";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tableRows: 0,
      currentSpecies: "No Species Selected",
      tableKitIDs: {},
      tableKitData: []
    };
    this.modifyRows = this.modifyRows.bind(this);
    this.selectSpecies = this.selectSpecies.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.fetchKitData = this.fetchKitData.bind(this);
    this.clearTable = this.clearTable.bind(this);
  }

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
      constants: [
        ["Buffer (µL)", 40],
        ["FcR Blocking Reagent (µL)", 10],
        ["Biotin-Antibody Cocktail (µL)", 10],
        ["Incubation (min)", 5],
        ["Buffer (µL)", 30],
        ["Anti-Biotin Microbeads (µL)", 20],
        ["Incubation (min)", 10],
        ["Washes", "3 x 3"]
      ]
    };
    return kitData;
  };

  clearTable = () => {
    this.setState({ tableRows: 0, tableKitIDs: {}, tableKitData: [] });
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
            path="/table"
            render={props => (
              <Table
                {...props}
                tableKitIDs={this.state.tableKitIDs}
                tableKitData={this.state.tableKitData}
                updateTable={this.updateTable}
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
