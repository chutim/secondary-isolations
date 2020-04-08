//the Home component contains button links to different species' kits and a button link to the Table component, which also displays how many current kits are in the Table.
import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Home.css";

//THINGS TO DO

class Home extends Component {
  render() {
    return (
      <div className="page">
        <header>
          <div className="page-title">Secondary Isolation Calculator</div>
          <div className="home-subtitle">
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
          </div>
        </header>
        <div className="home-container-species-buttons scrollable-body">
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
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.rowCount} Samples&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}

export default Home;
