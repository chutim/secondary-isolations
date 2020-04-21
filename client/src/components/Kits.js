//the Kits component lists all positive & negative kits for the selected species, and allows user to add kits to the Table and modify the number of samples for each kit. if the user is logged in, 'edit' buttons are visible for each kit, as well as a 'create kit' button on the page.
import React from "react";
import LinkButton from "./LinkButton.jsx";
import "./Kits.css";

//THINGS TO DO

const Kits = (props) => {
  const sortKitsByName = (kitArray) => {
    return kitArray.sort((a, b) => {
      const aName = a.name.toUpperCase();
      const bName = b.name.toUpperCase();
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });
  };

  const generateKitSection = (generatePosKits) => {
    const kitCollection = generatePosKits
      ? props.currentPosKits
      : props.currentNegKits;

    return (
      <div
        className={`kit-section section-${
          generatePosKits ? "positive" : "negative"
        }-selection`}
      >
        <div className="kit-section-title">
          {generatePosKits ? "Positive" : "Negative"} Selection
        </div>
        <div className="kit-section-list">
          {sortKitsByName(kitCollection).map((kit) => (
            <div className="kit-info-container" key={kit.id}>
              <div className="kit-name-container">
                <div className="kit-name">{kit.name}</div>

                <div>
                  <a
                    className="kit-id"
                    href={`https://www.miltenyibiotec.com/US-en/search.html?search=${kit.id}&options=on#globalSearchFamilies=%5B%5D`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {kit.id}
                  </a>
                </div>
              </div>
              <div className="kit-info-container-right">
                <LinkButton
                  to={`/edit/${kit.id}`}
                  className={
                    props.loggedIn
                      ? "edit-button"
                      : "edit-button logged-out-edit-button"
                  }
                  //attaches kit object to props.location.state, passing into CreateOrEdit
                  kit={kit}
                >
                  <i className="fas fa-pen"></i>
                </LinkButton>

                <div className="kit-options-row">
                  <button
                    className="kit-options-button kit-remove-button subtract-button"
                    onClick={() => {
                      props.updateTable("subtract", kit);
                    }}
                  >
                    -
                  </button>

                  <div className="kit-count">
                    {props.tableKitIDs[kit.id] || 0}
                  </div>

                  <button
                    className="kit-options-button kit-add-button add-button"
                    onClick={() => {
                      props.updateTable("add", kit);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <header>
        <div className="page-title">{props.currentSpecies} Kits</div>
      </header>
      <div className="kits-body scrollable-body">
        {generateKitSection(true)}
        {generateKitSection(false)}
      </div>

      <footer>
        <button
          className="nav-button back-button"
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </button>

        <LinkButton to="/" className="nav-button home-button">
          Home
        </LinkButton>

        <LinkButton
          to="/create"
          id={
            props.loggedIn
              ? "create-button-faded-in"
              : "create-button-faded-out"
          }
        >
          Create Kit
        </LinkButton>

        <LinkButton to="/table" className="nav-button table-button">
          Table &#40;{props.rowCount}{" "}
          {props.rowCount === 1 ? "Sample" : "Samples"}&#41;
        </LinkButton>
      </footer>
    </div>
  );
};

export default Kits;
