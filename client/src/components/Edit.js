import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Edit.css";

//THINGS TO DO
//where to access from? EDIT buttons on each kit in Table, EDIT buttons on each kit in Kits, EDIT ALL KITS button in Home.

//so this Edit can have two different renders.
//(1) an INDIVIDUAL KIT, from clicking in from Table, or from clicking in from the list in Kits, or from clicking in from ALL KITS. pre-populated fields from database, that are editable. has CREATE & UPDATE & DELETE button. will need 'currentKit: <id>' on App state.
//(2) ALL KITS, from clicking in from Home ('Edit All Kits' button). has CREATE button. when clicking on a kit from here, it goes to (1) INDIVIDUAL KIT.

//need to require sign-in to use edit buttons, don't render them otherwise.
//sign-in box can be floating div on App.js, upper corner. once signed in, it says 'Full Access Mode' with a Logout button. before sign-in, it says 'Visitor Mode' 'enter password for full access'
//how to stop user from just typing /edit or /create in the URL?????????

//this.props.editAllKits
//this.props.currentEditKitID
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params
    };
  }

  componentDidMount = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Edit</h3>
        </header>
        <div className="edit-body">
          {Object.keys(this.props.match.params).length ? (
            <div>single</div>
          ) : (
            <div>allkits</div>
          )}
        </div>
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
