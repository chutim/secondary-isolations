import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Edit.css";

//THINGS TO DO
//where to access from? EDIT buttons on each kit in Table, EDIT buttons on each kit in Kits, EDIT ALL KITS button in Home.

//so this Edit can have two different renders.
//(1) an INDIVIDUAL KIT, from clicking in from Table, or from clicking in from the list in Kits, or from clicking in from ALL KITS. pre-populated fields from database, that are editable. has CREATE & UPDATE & DELETE button. will need 'currentKit: <id>' on App state.
//(2) ALL KITS, from clicking in from Home ('Edit All Kits' button). has CREATE button. when clicking on a kit from here, it goes to (1) INDIVIDUAL KIT.
//toggle boolean on App: 'editAllKits: false'

//ALl SPECIES KITS, from clicking in from Kits ? Not needed. (1) takes care of that, you are already showing all of the species' kits in the Kits component. why not do it that way and have an All Species Kits button on Kits? because you still need to have INDIVIDUAL KIT when clicking in from Table. two birds.

//CREATE also shown in Kits page, will pre-populate the species field.

//need to require sign-in to use edit buttons, don't render them otherwise.
//sign-in box can be floating div on App.js, upper corner. once signed in, it says 'Full Access Mode' with a Logout button. before sign-in, it says 'Visitor Mode' 'enter password for full access'
//how to stop user from just typing /edit or /create in the URL?????????

class Edit extends Component {
  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Edit Kits</h3>
        </header>
        <footer>
          <button
            className="nav-button"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </button>
          <LinkButton to="/" className="nav-button home-button">
            Home
          </LinkButton>
          <LinkButton to="/table" className="nav-button table-button">
            Table &#40;{this.props.rowCount} Samples&#41;
          </LinkButton>
        </footer>
      </div>
    );
  }
}

export default Edit;
