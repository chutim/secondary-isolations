import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import { cloneDeep } from "lodash";
import apis from "../api";
import "./CreateOrEdit.css";

//THINGS TO DO
//drop-down for units in each constants row, forces user to remember to add units. helps take care of parsing constant name in case user doesn't use a space or parentheses.

//need to require sign-in to use edit buttons, don't render them otherwise.
//sign-in box can be floating div on App.js, upper corner. once signed in, it says 'Full Access Mode' with a Logout button. before sign-in, it says 'Visitor Mode' 'enter password for full access'
//how to stop user from just typing /edit or /create in the URL????????? check if signed in, if not, then don't show any create or edit button. or gray them out, if it makes the CSS look weird when they're missing.
//need to sign users out after a certain amount of time?

class CreateOrEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      species: "",
      type: "",
      constants: [[null, null, null]],
      duplicateID: false
    };
  }

  componentDidMount = async () => {
    //if editing a kit, grab the kit data pushed into the history object. if the user just went to the url directly, i.e., didn't click in from a kit, there is no history so grab from localStorage
    if (this.props.match.params.kitID) {
      if (this.props.location.state) {
        const constants = this.extractConstantNames(
          this.props.location.state.constants
        );
        await this.setState(this.props.location.state);
        await this.setState({ constants });
      } else {
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

  extractConstantNames = constants => {
    const arrayedConstantNames = constants.map(constantPair => {
      let arr = constantPair[0].split(" (");
      arr[1] = "(".concat(arr[1]);
      let withValue = [...arr, constantPair[1]];
      return withValue;
    });

    return arrayedConstantNames;
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
      if (constantNameOrValue === "constantName") {
        constants[constantRow][0] = e.target.value;
      } else if (constantNameOrValue === "constantUnit") {
        constants[constantRow][1] = e.target.value;
      } else if (constantNameOrValue === "constantValue") {
        constants[constantRow][2] = e.target.value;
      }
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
    let constantsCap = constants.map(constantGroup => {
      // const splitName = constantPair[0].split(" (");
      // constantPair[0] = [this.capitalizeWords(splitName[0]), splitName[1]].join(
      //   " ("
      // );
      constantGroup[0] = this.capitalizeWords(constantGroup[0]);
      let newConstantGroup = [];
      newConstantGroup.push(constantGroup[0].concat(" " + constantGroup[1]));
      newConstantGroup.push(constantGroup[2]);
      return newConstantGroup;
    });
    return { nameCap, speciesCap, constantsCap };
  };

  checkForEmptyFields = (id, name, species, type, constants) => {
    let constantsEmpty = false;
    for (let constant of constants) {
      if (!constant[0] || !constant[1] || !constant[2]) constantsEmpty = true;
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
    //if this was an update on a kit, make sure it gets updated in Table if present
    if (updateOrCreate === "update") {
      //if this was an update on a kit, make sure it gets updated in Table if present
      this.props.updateTableKitData(id);
      //bug: if user copy/pastes the edit kit URL in a new tab, it will update the kit in db but then send the user back to the default new tab page
      this.props.history.goBack();
    }
    await this.clearStateAndStorage();
    alert(
      updateOrCreate === "update"
        ? "Kit updated in database!"
        : "New kit added to database!"
    );

    await this.props.fetchKitsFromDatabase();
    //after App has finished grabbing the new set of kits, update the kits for the currentSpecies, in case the user goes back to the species Kits page, should see the new update
    await this.props.selectSpecies(this.props.currentSpecies);
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
      constants: [[null, null, null]]
    });
  };

  modifyConstantRows = async modification => {
    if (modification === "add")
      await this.setState({
        constants: [...this.state.constants, [null, null, null]]
      });
    else if (modification === "subtract")
      await this.setState({ constants: this.state.constants.slice(0, -1) });
    this.updateLocalStorage(
      this.props.match.params.kitID ? "update" : "create"
    );
  };

  deleteKit = async kitID => {
    this.clearStateAndStorage();
    await apis.deleteKitById(kitID);
    //update App state
    await this.props.fetchKitsFromDatabase();
    //update species' kits in Kits component if necessary
    await this.props.selectSpecies(this.props.currentSpecies);
    this.props.history.goBack();
    console.log("Kit deleted from database.");
  };

  createArrayOfNonRepeatingElements = (array, indexToUse) => {
    const set = new Set();
    for (let el of array) {
      set.add(el[indexToUse]);
    }
    return Array.from(set).sort();
  };

  render() {
    return (
      <div className="page">
        <header>
          <h3 className="page-title">
            {this.props.match.params.kitID ? (
              <>
                Edit Kit (
                <a
                  href={`https://www.miltenyibiotec.com/US-en/search.html?search=${this.props.match.params.kitID}&options=on#globalSearchFamilies=%5B%5D`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.props.match.params.kitID}
                </a>
                )
              </>
            ) : (
              "Create Kit"
            )}
          </h3>
        </header>
        <div className="create-body">
          <div>All fields required.</div>
          <form
            className="create-form"
            autoComplete="off"
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
                  <td align="left" colSpan={2}>
                    <input
                      type="text"
                      value={this.state.id}
                      disabled={this.props.match.params.kitID ? true : false}
                      name="id"
                      placeholder="000-000-000"
                      onChange={this.handleInput}
                      onBlur={this.checkID}
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
                  <td align="left" colSpan={2}>
                    <input
                      type="text"
                      value={this.state.name}
                      name="name"
                      placeholder="CD000 Isolation Kit"
                      onChange={this.handleInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="right">Species:</td>
                  <td align="left" colSpan={2}>
                    <input
                      type="text"
                      list="species-choices"
                      name="species"
                      onChange={this.handleInput}
                      value={this.state.species}
                      placeholder={this.state.species ? "" : "Unicorn"}
                    />
                    <datalist id="species-choices">
                      {this.props.allSpecies.map(species => (
                        <option key={species}>{species}</option>
                      ))}
                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td align="right">Type:</td>
                  <td align="left" colSpan={2}>
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
                  <td colSpan={3}>Constants</td>
                </tr>
                <tr>
                  <td colSpan={3}>Be sure to include units.</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>Units</td>
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
                        placeholder={constantRow[0] ? "" : "Reagent"}
                      />
                      <datalist id="constants-names">
                        {this.createArrayOfNonRepeatingElements(
                          this.props.allConstantNames,
                          0
                        ).map(name => (
                          <option key={name}>{name}</option>
                        ))}
                      </datalist>
                    </td>

                    <td>
                      <input
                        type="text"
                        list="units"
                        onChange={e => {
                          this.handleInput(e, idx, "constantUnit");
                        }}
                        value={constantRow[1] || ""}
                        placeholder={constantRow[1] ? "" : "(unit)"}
                      />
                      <datalist id="units">
                        {this.createArrayOfNonRepeatingElements(
                          this.props.allConstantNames,
                          1
                        ).map(unit => (
                          <option key={unit}>{unit}</option>
                        ))}
                      </datalist>
                    </td>

                    <td align="left">
                      <input
                        type="text"
                        onChange={e => {
                          this.handleInput(e, idx, "constantValue");
                        }}
                        value={constantRow[2] || ""}
                        placeholder={constantRow[2] ? "" : "000"}
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
              value={
                this.props.match.params.kitID ? "Update Kit" : "Create Kit"
              }
            />
            {/* only show delete button if editing a kit */}
            {this.props.match.params.kitID ? (
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
            ) : null}
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

export default CreateOrEdit;
