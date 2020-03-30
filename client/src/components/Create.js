import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import { cloneDeep } from "lodash";
import apis from "../api";
import "./Create.css";

//THINGS TO DO
//delete all the bad kits from db
//upload legit kits

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      species: "",
      type: "",
      constants: [[null, null]]
    };
  }

  componentDidMount = async () => {
    console.log("Fetching saved form data...");
    const localForm = JSON.parse(localStorage.getItem("createState"));
    await this.setState(localForm);
    console.log("Saved form data loaded.");
  };

  updateLocalStorage = () => {
    console.log("UPDATING LOCALSTORAGE");
    localStorage.setItem("createState", JSON.stringify(this.state));
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
      //check to see if the ID is already used. there should not be duplicate kits
      if (e.target.name === "id" && this.props.allKitIDs.has(e.target.value)) {
        return alert("This kit ID already exists.");
        // return;
      }

      await this.setState({ [e.target.name]: e.target.value });
    }
    this.updateLocalStorage();
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

  handleSubmit = async e => {
    e.preventDefault();
    if (this.validateFields() === false) return;
    const { id, name, species, type, constants } = this.validateFields();

    await apis.createKit({
      id,
      name,
      species,
      type,
      constants
    });
    this.clearStateAndStorage();
    alert("New kit added to database!");
    this.props.fetchKitsFromDatabase();
  };

  clearStateAndStorage = () => {
    localStorage.removeItem("createState");
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
    this.updateLocalStorage();
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">Create Kit</h3>
        </header>
        <div className="create-body">
          <div>All fields required.</div>
          <form className="create-form" onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td align="right">ID:</td>
                  <td align="left">
                    <input
                      type="text"
                      value={this.state.id}
                      name="id"
                      placeholder="111-222-333"
                      onChange={this.handleInput}
                      autoComplete="off"
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
                      <option>Human</option>
                      <option>Non-Human Primate</option>
                      <option>Mouse</option>
                      <option>Rat</option>
                      <option>Dog</option>
                      <option>Rabbit</option>
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
            <input type="submit" value="Create" />
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
          <LinkButton to="/edit" className="nav-button">
            Edit Kits
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
