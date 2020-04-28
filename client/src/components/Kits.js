//the Kits component lists all positive & negative kits for the selected species, and allows user to modify the number of samples for each kit on the Table. if the user is logged in, a 'create kit' button is shown, as well as 'edit' buttons for each kit.
import React from "react";
import LinkButton from "./LinkButton.jsx";
import Footer from "./Footer";
import "./Kits.css";

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

  const generatePosKitSection = (generatePosKitsBool) => {
    const kitCollection = generatePosKitsBool
      ? props.currentPosKits
      : props.currentNegKits;

    return (
      <div
        className={`kit-section section-${
          generatePosKitsBool ? "positive" : "negative"
        }-selection`}
      >
        <div className="kit-section-title">
          {generatePosKitsBool ? "Positive" : "Negative"} Selection
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
                    <i className="fas fa-minus"></i>
                  </button>

                  <div className="kit-count">
                    {(props.tableData[kit.species] &&
                      props.tableData[kit.species][kit.id] &&
                      props.tableData[kit.species][kit.id].samples.length) ||
                      0}
                  </div>

                  <button
                    className="kit-options-button kit-add-button add-button"
                    onClick={() => {
                      props.updateTable("add", kit);
                    }}
                  >
                    <i className="fas fa-plus"></i>
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
        <div className="page-title">
          {props.currentSpecies
            ? `${props.currentSpecies} Kits`
            : "No Species Selected"}
        </div>
      </header>
      <div className="kits-body scrollable-body">
        {generatePosKitSection(true)}
        {generatePosKitSection(false)}
      </div>

      <Footer {...props} currComponent={"Kits"} />
    </div>
  );
};

export default Kits;
