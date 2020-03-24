import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
  }

  modifyRows = modification => {
    if (modification === "add")
      this.setState({ tableRows: this.state.tableRows + 1 });
    else if (modification === "remove" && this.state.tableRows > 0)
      this.setState({ tableRows: this.state.tableRows - 1 });
  };

  selectSpecies = species => {
    this.setState({ currentSpecies: species });
  };

  updateTable = (modification, kitID) => {
    let tableKitIDs = this.state.tableKitIDs;
    if (modification === "add") {
      this.modifyRows(modification);
      tableKitIDs[kitID] = (tableKitIDs[kitID] || 0) + 1;
      this.setState({ tableKitIDs });
    }
    if (modification === "remove") {
      if (tableKitIDs[kitID]) {
        this.modifyRows(modification);
        tableKitIDs[kitID]--;
      }
      this.setState({ tableKitIDs });
    }

    console.log(this.state.tableKitIDs);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/kits"
            render={props => (
              <Kits
                {...props}
                currentSpecies={this.state.currentSpecies}
                // modifyRows={this.modifyRows}
                tableRows={this.state.tableRows}
                updateTable={this.updateTable}
              />
            )}
          ></Route>
          <Route
            path="/table"
            render={props => (
              <Table {...props} updateTable={this.updateTable} />
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
