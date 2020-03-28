//the Home component contains links to different species' kits and a link to the Table component, which also displays how many current kits are in the Table.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Home.css";

//THINGS TO DO
//include function/button to add species
//get the species from database instead of hardcode here

class Home extends Component {
  state = {
    buttons: ["Human", "Non-Human Primate", "Mouse", "Rat", "Dog", "Rabbit"]
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
          {this.state.buttons.map(button => (
            <LinkButton
              to="/kits"
              className="species-button"
              onClick={() => this.props.selectSpecies(button)}
              key={button}
            >
              {button}
            </LinkButton>
          ))}
        </div>
        <footer>
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.tableRows} Kits&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}

export default Home;
