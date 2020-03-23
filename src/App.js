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
      currentSpecies: "No Species Selected"
    };
    this.functionModifyRows = this.functionModifyRows.bind(this);
    this.functionSelectSpecies = this.functionSelectSpecies.bind(this);
  }

  functionModifyRows = modification => {
    if (modification === "increment")
      this.setState({ tableRows: this.state.tableRows + 1 });
    if (modification === "decrement" && this.state.tableRows > 0)
      this.setState({ tableRows: this.state.tableRows - 1 });
  };

  functionSelectSpecies = species => {
    this.setState({ currentSpecies: species });
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
                functionModifyRows={this.functionModifyRows}
              />
            )}
          ></Route>
          <Route path="/table" render={props => <Table {...props} />}></Route>
          <Route
            path="/"
            exact={true}
            render={props => (
              <Home
                {...props}
                tableRows={this.state.tableRows}
                functionSelectSpecies={this.functionSelectSpecies}
              />
            )}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
