import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import { cloneDeep } from "lodash";
import apis from "../api";
import "./CreateOrEdit.css";

//THINGS TO DO
//add all constants from App state into suggestions for constant name inputs
//after deleting kit, update everything on App state
//drop-down for units in each constants row, forces user to remember to add units
//upload legit kits

//need to require sign-in to use edit buttons, don't render them otherwise.
//sign-in box can be floating div on App.js, upper corner. once signed in, it says 'Full Access Mode' with a Logout button. before sign-in, it says 'Visitor Mode' 'enter password for full access'
//how to stop user from just typing /edit or /create in the URL?????????

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      species: "",
      type: "",
      constants: [[null, null]],
      duplicateID: false
    };
  }

  componentDidMount = async () => {
    //if editing a kit, grab the kit data pushed into the history object. if the user just went to the url directly, i.e., didn't click in from a kit, there is no history so grab from localStorage
    if (this.props.match.params.kitID) {
      if (this.props.location.state)
        await this.setState(this.props.location.state);
      else {
        console.log("Fetching saved update kit data...");
        const localForm = JSON.parse(localStorage.getItem("updateState"));
        await this.setState(localForm);
        console.log("Saved update kit data loaded.");
      }
      this.updateLocalStorage("update");
    } else {
      //otherwise, grab any form data from localStorage
      console.log("Fetching saved create kit data...");
      const localForm = JSON.parse(localStorage.getItem("createState"));
      await this.setState(localForm);
      console.log("Saved create kit data loaded.");
    }
  };

  updateLocalStorage = createOrUpdate => {
    if (createOrUpdate === "create")
      localStorage.setItem("createState", JSON.stringify(this.state));
    else if (createOrUpdate === "update")
      localStorage.setItem("updateState", JSON.stringify(this.state));
  };

  handleInput = async (e, constantRow, constantNameOrValue) => {
    const constants = cloneDeep(this.state.constants);
    //if we're modifying a constant, modify the corresponding sub-array on state
    if (constantNameOrValue) {
      constantNameOrValue === "constantName"
        ? (constants[constantRow][0] = e.target.value)
        : (constants[constantRow][1] = e.target.value);
      await this.setState({ constants });
    }
    //otherwise we are not dealing with constants, just update the appropriate fields
    else {
      await this.setState({ [e.target.name]: e.target.value });
      //check to see if the ID is already used. there should not be duplicate kits
      if (this.props.allKitIDs.has(this.state.id)) {
        this.setState({ duplicateID: true });
      } else {
        this.setState({ duplicateID: false });
      }
    }
    this.updateLocalStorage(
      this.props.match.params.kitID ? "update" : "create"
    );
  };

  checkID = () => {
    if (this.props.allKitIDs.has(this.state.id)) {
      alert("This kit ID is already in use.");
    }
  };

  capitalizeWords = string => {
    const arrayOfWords = string.split(" ");
    const capitalizedArray = arrayOfWords.map(word => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return capitalizedArray.join(" ");
  };

  capitalizeFields = (name, species, constants) => {
    let nameCap = this.capitalizeWords(name);
    let speciesCap = this.capitalizeWords(species);
    let constantsCap = constants.map(constantPair => {
      constantPair[0] = this.capitalizeWords(constantPair[0]);
      return constantPair;
    });
    return { nameCap, speciesCap, constantsCap };
  };

  checkForEmptyFields = (id, name, species, type, constants) => {
    let constantsEmpty = false;
    for (let constant of constants) {
      if (!constant[0] || !constant[1]) constantsEmpty = true;
    }
    if (
      id === "" ||
      name === "" ||
      species === "" ||
      type === "" ||
      constantsEmpty
    ) {
      alert("All fields must be filled.");
      return true;
    }
    return false;
  };

  validateFields = () => {
    const { id, name, species, type, constants } = cloneDeep(this.state);

    if (this.checkForEmptyFields(id, name, species, type, constants))
      return false;

    let { nameCap, speciesCap, constantsCap } = this.capitalizeFields(
      name,
      species,
      constants
    );

    return {
      id,
      name: nameCap,
      species: speciesCap,
      type,
      constants: constantsCap
    };
  };

  handleSubmit = async (e, updateOrCreate) => {
    e.preventDefault();
    if (this.validateFields() === false) return;
    const { id, name, species, type, constants } = this.validateFields();

    updateOrCreate === "update"
      ? await apis.updateKitById(id, {
          name,
          species,
          type,
          constants
        })
      : await apis.createKit({
          id,
          name,
          species,
          type,
          constants
        });
    await this.clearStateAndStorage();
    alert(
      updateOrCreate === "update"
        ? "Kit updated in database!"
        : "New kit added to database!"
    );
    await this.props.fetchKitsFromDatabase();
    //after App has finished grabbing the new set of kits, update the kits for the currentSpecies, in case the user goes back to the species Kits page, should see the new update
    await this.props.selectSpecies(this.props.currentSpecies);
    //if this was an update on a kit, make sure it gets updated in Table if present
    if (updateOrCreate === "update") this.props.updateTableKitData(id);
  };

  clearStateAndStorage = () => {
    localStorage.removeItem(
      this.props.match.params.kitID ? "updateState" : "createState"
    );
    this.setState({
      id: "",
      name: "",
      species: "",
      type: "",
      constants: [[null, null]]
    });
  };

  modifyConstantRows = async modification => {
    if (modification === "add")
      await this.setState({
        constants: [...this.state.constants, [null, null]]
      });
    else if (modification === "subtract")
      await this.setState({ constants: this.state.constants.slice(0, -1) });
    this.updateLocalStorage(
      this.props.match.params.kitID ? "update" : "create"
    );
  };

  deleteKit = async kitID => {
    await apis.deleteKitById(kitID);
    console.log("Kit deleted from database.");
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">
            {this.props.match.params.kitID
              ? `Edit Kit (${this.props.match.params.kitID})`
              : "Create Kit"}
          </h3>
        </header>
        <div className="create-body">
          <div>All fields required.</div>
          <form
            className="create-form"
            onSubmit={e => {
              this.handleSubmit(
                e,
                this.props.match.params.kitID ? "update" : "create"
              );
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td align="right">ID:</td>
                  <td align="left">
                    <input
                      type="text"
                      value={this.state.id}
                      disabled={this.props.match.params.kitID ? true : false}
                      name="id"
                      placeholder="111-222-333"
                      onChange={this.handleInput}
                      onBlur={this.checkID}
                      autoComplete="off"
                      className={
                        this.state.duplicateID && !this.props.match.params.kitID
                          ? "error"
                          : ""
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">Name:</td>
                  <td align="left">
                    <input
                      type="text"
                      value={this.state.name}
                      name="name"
                      placeholder="CD123 Isolation Kit"
                      onChange={this.handleInput}
                      autoComplete="off"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">Species:</td>
                  <td align="left">
                    <input
                      type="text"
                      list="species-choices"
                      name="species"
                      onChange={this.handleInput}
                      value={this.state.species}
                      placeholder={this.state.species ? "" : "Unicorn"}
                      autoComplete="off"
                    />
                    <datalist id="species-choices">
                      {this.props.allSpecies.sort().map(species => (
                        <option>{species}</option>
                      ))}
                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td align="right">Type:</td>
                  <td align="left">
                    <select
                      name="type"
                      value={
                        this.state.type === "Positive"
                          ? "Positive"
                          : this.state.type === "Negative"
                          ? "Negative"
                          : "Select one:"
                      }
                      onChange={this.handleInput}
                    >
                      <option hidden>Select one:</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Constants</td>
                </tr>
                <tr>
                  <td colSpan={2}>Be sure to include units.</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>Constant</td>
                </tr>
                {this.state.constants.map((constantRow, idx) => (
                  <tr key={idx}>
                    <td align="right">
                      <input
                        type="text"
                        list="constants-names"
                        onChange={e => {
                          this.handleInput(e, idx, "constantName");
                        }}
                        value={constantRow[0] || ""}
                        placeholder={constantRow[0] ? "" : "Reagent (µL)"}
                        autoComplete="off"
                      />
                      <datalist id="constants-names">
                        <option>Incubation (min)</option>
                        <option>Washes (times x mL)</option>
                        <option>Buffer (µL)</option>
                        <option>Biotin-Antibody Cocktail (µL)</option>
                        <option>Anti-Biotin Microbeads (µL)</option>
                        <option>FcR Blocking Reagent (µL)</option>
                      </datalist>
                    </td>
                    <td align="left">
                      <input
                        type="text"
                        onChange={e => {
                          this.handleInput(e, idx, "constantValue");
                        }}
                        value={constantRow[1] || ""}
                        placeholder={constantRow[1] ? "" : "123"}
                        autoComplete="off"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="create-add-subtract-container">
              <button
                className="create-row-button add-row-button"
                type="button"
                onClick={() => this.modifyConstantRows("add")}
              >
                Add Row
              </button>
              <button
                className="create-row-button subtract-row-button"
                type="button"
                onClick={() => this.modifyConstantRows("subtract")}
              >
                Subtract Row
              </button>
            </div>
            <button type="button" onClick={this.clearStateAndStorage}>
              Clear All
            </button>
            <input
              type="submit"
              value={this.props.location.state ? "Update Kit" : "Create Kit"}
            />
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Confirm permanently deleting this kit from the database?"
                  )
                )
                  this.deleteKit(this.state.id);
              }}
            >
              Delete Kit
            </button>
          </form>
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

export default Create;
