//the Home component contains links to different species' kits and a link to the Table component, which also displays how many current kits are in the Table.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import apis from "../api";
import "./Home.css";

//THINGS TO DO

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log("handleSubmit");

    apis
      .logIn({
        username: "admin",
        password: "BioIVT#friends"
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.setLoggedIn();
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Secondary Isolation Calculator</h3>
          <h5 className="home-subtitle">
            For{" "}
            <a
              className="miltenyi-link"
              href="https://www.miltenyibiotec.com/US-en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Miltenyi Biotec
            </a>{" "}
            Kits
          </h5>
        </header>
        <div className="home-container-species-buttons">
          {this.props.allSpecies.map(species => (
            <LinkButton
              to="/kits"
              className="species-button"
              onClick={() => this.props.selectSpecies(species)}
              key={species}
            >
              {species}
            </LinkButton>
          ))}
        </div>
        <footer>
          <button className="nav-button" onClick={this.handleSubmit}>
            Log In
          </button>
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.rowCount} Samples&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}

export default Home;
