import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from "./logo.svg";
import { Home, Kits, Chart } from "./components";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/kits">
            <Kits />
          </Route>
          <Route path="/chart">
            <Chart />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
