//the Home component contains button links to different species' kits, a button to create a new kit, and a button link to the Table component, which also displays how many current kits are in the Table.
import React from "react";
import LinkButton from "./LinkButton.jsx";
import Footer from "./Footer";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="page">
      <header>
        <div className="page-title" id="home-title">
          Secondary Isolation Calculator
        </div>
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
        {props.allSpecies.map((species) => (
          <LinkButton
            to="/kits"
            className="species-button"
            onClick={() => props.selectSpecies(species)}
            key={species}
          >
            {species}
          </LinkButton>
        ))}
      </div>

      <Footer {...props} currComponent={"Home"} />
    </div>
  );
};

export default Home;
