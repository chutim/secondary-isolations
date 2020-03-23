import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header className="home-header">
          <h3>Secondary Isolations Calculations Tool</h3>
          <h5>
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
        <div className="home-section-species-buttons">
          <button>poop</button>
          <button>poop</button>
          <button>poop</button>
        </div>
      </div>
    );
  }
}

export default Home;
