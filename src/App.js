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
      currentSpecies: ""
    };
    this.functionModifyRows = this.functionModifyRows.bind(this);
  }

  functionModifyRows = modification => {
    if (modification === "increment")
      this.setState({ tableRows: this.state.tableRows + 1 });
    if (modification === "decrement")
      this.setState({ tableRows: this.state.tableRows - 1 });
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
              <Home {...props} tableRows={this.state.tableRows} />
            )}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
