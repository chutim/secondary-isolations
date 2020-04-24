//the CreateOrEdit component allows the user to create a new kit or update/delete an existing kit, depending on where they navigated from. validation checks before submission ensure that all fields are filled, IDs are not re-used, appropriate fields are capitalized, and trailing/leading whitespace is deleted. submitting a new kit or an updated kit will update the App state as well as the database.
import React, { Component } from "react";
import Footer from "./Footer";
import { cloneDeep } from "lodash";
import memoize from "memoize-one";
import apis from "../api";
import "./CreateOrEdit.css";

//THINGS TO DO

class CreateOrEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      species: "",
      type: "",
      constants: [[null, null, null, null]],
      duplicateID: false,
      showAlert: "",
    };
    //ref for kit type HTML input. helps clear the input's value on click, showing the user both options ("Positive" and "Negative") immediately, as opposed to only suggesting matching options
    this.typeRef = React.createRef();
  }

  componentDidMount = async () => {
    //if there is a kitID in the URL, we are editing a kit
    if (this.props.match.params.kitID) {
      this.loadKitToEdit();
    } else {
      //otherwise, we are creating a kit - grab any form data from localStorage
      this.loadSavedCreateData();
    }
  };

  /*--------------------------CDM functions------------------------------ */
  fetchKitByID = async (kitID) => {
    console.log("Finding kit data based on URL...");
    let kit = await apis
      .getKitByID(kitID)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        console.error(err);
      });
    return kit;
  };

  loadKitToEdit = async () => {
    //grab the kit data pushed into the history object (location.state). if the user just went to the url directly, e.g., didn't click in from a kit, there is no history so query the db
    if (this.props.location.state) {
      await this.setState(this.props.location.state);
    } else {
      const kitFromDb = await this.fetchKitByID(this.props.match.params.kitID);

      if (!kitFromDb) {
        console.log("Kit not found based on URL......");
        this.props.history.push("/invalid");
        return;
      }

      await this.setState(kitFromDb);
      console.log("Kit data loaded based on URL.");
    }
    this.updateLocalStorage("update");
  };

  loadSavedCreateData = async () => {
    console.log("Fetching saved create kit data...");
    const localForm = JSON.parse(localStorage.getItem("createState"));
    await this.setState(localForm);
    console.log("Saved create kit data loaded.");
  };

  /*---------------------input field suggestions--------------------------- */
  generateConstantsDatalists = memoize((allKits) => {
    if (!allKits) return;
    const constantNames = this.createArrayOfNonRepeatingElements(
      allKits,
      0,
      true
    );
    const constantUnits = this.createArrayOfNonRepeatingElements(allKits, 1);
    const constantCells = this.createArrayOfNonRepeatingElements(allKits, 3);
    return { constantNames, constantUnits, constantCells };
  });

  createArrayOfNonRepeatingElements = (allKits, indexToUse, appendUnits) => {
    const allConstantGroups = allKits.reduce((finalArray, kit) => {
      finalArray.push(...kit.constants);
      return finalArray;
    }, []);

    const set = new Set();

    for (let constantGroup of allConstantGroups) {
      let constant = constantGroup[indexToUse];
      if (appendUnits) {
        constant += " (" + constantGroup[1] + ")";
      }
      set.add(constant);
    }

    return Array.from(set).sort();
  };

  /*--------------------------input handlers------------------------------ */
  handleInputConstant = async (e, constantRow, constantType) => {
    const constants = cloneDeep(this.state.constants);
    switch (constantType) {
      case "constantName":
        //note that user will not be able to type "(".
        const values = e.target.value.split("(");
        //if there is something on the other side of the (, the user must have selected a suggestion.
        if (values[1]) {
          constants[constantRow][0] = values[0].trim();
          constants[constantRow][1] = values[1].slice(0, -1);
        } else {
          constants[constantRow][0] = values[0];
        }
        break;
      case "constantUnit":
        constants[constantRow][1] = e.target.value;
        break;
      case "constantValue":
        constants[constantRow][2] = e.target.value;
        break;
      case "constantCells":
        constants[constantRow][3] = e.target.value;
        break;
      default:
        console.log("Error modifying constants.");
    }

    await this.setState({ constants });
    this.updateLocalStorage(
      this.props.match.params.kitID ? "update" : "create"
    );
  };

  handleInput = async (e) => {
    //if modifying ID -> there should not be duplicate kit IDs
    e.target.name === "id" && this.props.allKitIDs.has(e.target.value)
      ? this.setState({ duplicateID: true })
      : this.setState({ duplicateID: false });

    await this.setState({ [e.target.name]: e.target.value });
    this.updateLocalStorage(
      this.props.match.params.kitID ? "update" : "create"
    );
  };

  /*-------------------------form validation------------------------------ */
  capitalizeWords = (string) => {
    const arrayOfWords = string.split(" ");
    const capitalizedArray = arrayOfWords.map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return capitalizedArray.join(" ");
  };

  processFields = (name, species, constants) => {
    const namePrepped = this.capitalizeWords(String(name).trim());
    const speciesPrepped = this.capitalizeWords(species.trim());
    const constantsPrepped = constants.map((constantGroup) => {
      constantGroup = constantGroup.map((el) => el.trim());
      constantGroup[0] = this.capitalizeWords(constantGroup[0]);
      return constantGroup;
    });
    return { namePrepped, speciesPrepped, constantsPrepped };
  };

  checkForEmptyFields = (id, name, species, type, constants) => {
    let constantsEmpty = false;
    for (let constant of constants) {
      if (!constant[0] || !constant[1] || !constant[2] || !constant[3])
        constantsEmpty = true;
    }
    if (
      id === "" ||
      name === "" ||
      species === "" ||
      type === "" ||
      constantsEmpty
    ) {
      this.setState({ showAlert: "emptyFields" });
      return true;
    }
    return false;
  };

  validateFields = () => {
    const { id, name, species, type, constants } = cloneDeep(this.state);

    if (this.checkForEmptyFields(id, name, species, type, constants))
      return false;

    const {
      namePrepped,
      speciesPrepped,
      constantsPrepped,
    } = this.processFields(name, species, constants);

    return {
      id: String(id),
      name: namePrepped,
      species: speciesPrepped,
      type,
      constants: constantsPrepped,
    };
  };

  /*--------------------------form submission------------------------------ */
  handleSubmit = async (e, updateOrCreate) => {
    e.preventDefault();
    if (this.validateFields() === false) return;
    const { id, name, species, type, constants } = this.validateFields();

    if (updateOrCreate === "update") {
      await apis
        .updateKitById(id, {
          name,
          species,
          type,
          constants,
        })
        .catch((err) => console.error(err));
      this.props.updateTableKitData(
        {
          id,
          name,
          species,
          type,
          constants,
        },
        "update"
      );
      this.setState({ showAlert: "update" });
    } else if (updateOrCreate === "create") {
      await apis
        .createKit({
          id,
          name,
          species,
          type,
          constants,
        })
        .catch((err) => console.error(err));
      this.setState({ showAlert: "create" });
    }

    await this.props.fetchKitsFromDatabase();
    //after App has finished grabbing the new set of kits, update the kits for the currentSpecies, in case the user goes back to the species Kits page, should see the new update
    await this.props.selectSpecies(this.props.currentSpecies);
  };

  deleteKit = async () => {
    const { id, name, species, type, constants } = cloneDeep(this.state);
    await apis.deleteKitById(id).catch((err) => console.error(err));
    //update App state
    await this.props.fetchKitsFromDatabase();
    //update species' kits in Kits component if necessary
    await this.props.selectSpecies(this.props.currentSpecies);

    await this.props.updateTableKitData(
      { id, name, species, type, constants },
      "delete"
    );
    console.log("Kit deleted from database.");
  };

  handleAlert = async () => {
    const action = this.state.showAlert;
    //bug: if user copy/pastes the edit kit URL in a new tab, it will update the kit in db but then send the user back to the default new tab page
    switch (action) {
      case "delete":
        await this.deleteKit();
        this.props.history.goBack();
        this.clearStateAndStorage();
        break;
      case "update":
        this.props.history.goBack();
        this.clearStateAndStorage();
        break;
      case "create":
        this.clearStateAndStorage();
        break;
      default:
        break;
    }
    this.setState({ showAlert: "" });
  };

  /*---------------------------other functions----------------------------- */
  updateLocalStorage = (createOrUpdate) => {
    if (createOrUpdate === "create")
      localStorage.setItem("createState", JSON.stringify(this.state));
    else if (createOrUpdate === "update")
      localStorage.setItem("updateState", JSON.stringify(this.state));
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
      constants: [[null, null, null, null]],
    });
  };

  modifyConstantRows = async (modification) => {
    if (modification === "add")
      await this.setState({
        constants: [...this.state.constants, [null, null, null, null]],
      });
    else if (modification === "subtract")
      await this.setState({ constants: this.state.constants.slice(0, -1) });
    this.updateLocalStorage(
      this.props.match.params.kitID ? "update" : "create"
    );
  };
  /*--------------------------------------------------------------------- */

  render() {
    const datalists = this.generateConstantsDatalists(this.props.allKits);
    return (
      <div className="page">
        <header>
          <div className="page-title">
            {this.props.match.params.kitID ? (
              <>
                Edit{" "}
                <a
                  className="edit-kit-id"
                  href={`https://www.miltenyibiotec.com/US-en/search.html?search=${this.state.id}&options=on#globalSearchFamilies=%5B%5D`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.id}
                </a>
              </>
            ) : (
              "Create Kit"
            )}
          </div>
        </header>
        <form
          className="create-form"
          autoComplete="off"
          onSubmit={(e) => {
            this.handleSubmit(
              e,
              this.props.match.params.kitID ? "update" : "create"
            );
          }}
        >
          <div className="create-section-left">
            <table id="create-edit-table">
              <tbody>
                <tr>
                  <td className="create-form-label" align="right">
                    ID
                  </td>
                  <td align="left" colSpan={2}>
                    <input
                      type="text"
                      value={this.state.id}
                      disabled={this.props.match.params.kitID ? true : false}
                      name="id"
                      placeholder="000-000-000"
                      onChange={this.handleInput}
                      className={
                        this.state.duplicateID && !this.props.match.params.kitID
                          ? "form-top-input error"
                          : "form-top-input"
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="create-form-label" align="right">
                    Name
                  </td>
                  <td align="left" colSpan={2}>
                    <input
                      className="form-top-input"
                      type="text"
                      value={this.state.name}
                      name="name"
                      placeholder="CD000 Isolation Kit"
                      onChange={this.handleInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="create-form-label" align="right">
                    Species
                  </td>
                  <td align="left" colSpan={2}>
                    <input
                      className="form-top-input"
                      type="text"
                      list="species-choices"
                      name="species"
                      onChange={this.handleInput}
                      value={this.state.species}
                      placeholder="Dragon"
                    />
                    <datalist id="species-choices">
                      {this.props.allSpecies.map((species) => (
                        <option key={species}>{species}</option>
                      ))}
                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td className="create-form-label" align="right">
                    Selection
                  </td>
                  <td align="left" colSpan={2}>
                    <input
                      className="form-top-input select-type"
                      type="text"
                      list="type-choices"
                      name="type"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      ref={this.typeRef}
                      onMouseDown={() => {
                        this.typeRef.current.value = "";
                        this.setState({ type: "" });
                      }}
                      onChange={this.handleInput}
                      value={this.state.type}
                      placeholder="Select one:"
                    />
                    <datalist id="type-choices">
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td className="constants-header" colSpan={3}>
                    Constants
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="scrollable-body table-of-constants-container">
              <table className="table-of-constants">
                <thead className="toc-head">
                  <tr className="toc-header">
                    <th className="toc-name-col create-form-label">Name</th>
                    <th className="create-form-label">Units</th>
                    <th className="create-form-label">Constant</th>
                    <th className="toc-cells-col create-form-label">Cells</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.constants.map((constantRow, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          className="form-bottom-input"
                          type="text"
                          list="constants-names"
                          onChange={(e) => {
                            this.handleInputConstant(e, idx, "constantName");
                          }}
                          value={constantRow[0] || ""}
                          placeholder="Fireball Cocktail"
                        />
                        <datalist id="constants-names">
                          {datalists.constantNames.map((nameAndUnits) => (
                            <option key={nameAndUnits}>{nameAndUnits}</option>
                          ))}
                        </datalist>
                      </td>

                      <td>
                        <input
                          className="form-bottom-input"
                          type="text"
                          list="units"
                          onChange={(e) => {
                            this.handleInputConstant(e, idx, "constantUnit");
                          }}
                          value={constantRow[1] || ""}
                          placeholder="cups"
                        />
                        <datalist id="units">
                          {datalists.constantUnits.map((unit) => (
                            <option key={unit}>{unit}</option>
                          ))}
                        </datalist>
                      </td>

                      <td>
                        <input
                          className="form-bottom-input"
                          type="text"
                          onChange={(e) => {
                            this.handleInputConstant(e, idx, "constantValue");
                          }}
                          value={constantRow[2] || ""}
                          placeholder="000"
                        />
                      </td>
                      <td>
                        <input
                          className="form-bottom-input"
                          type="text"
                          list="cells"
                          onChange={(e) => {
                            this.handleInputConstant(e, idx, "constantCells");
                          }}
                          value={constantRow[3] || ""}
                          placeholder="10^00"
                        />
                        <datalist id="cells">
                          {datalists.constantCells.map((cells) => (
                            <option key={cells}>{cells}</option>
                          ))}
                        </datalist>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="create-add-subtract-container">
              <button
                className="create-add-subtract-row-button create-add-button"
                type="button"
                onClick={() => this.modifyConstantRows("add")}
              >
                Add Row
              </button>
              <button
                className="create-add-subtract-row-button create-subtract-button"
                type="button"
                onClick={() => this.modifyConstantRows("subtract")}
              >
                Remove Row
              </button>
            </div>
          </div>
          <div className="create-section-right">
            <button
              className="create-master-button create-clear-button"
              type="button"
              onClick={this.clearStateAndStorage}
            >
              Clear All
            </button>
            <input
              className="create-master-button create-create-update-button"
              type="submit"
              value={
                this.props.match.params.kitID ? "Update Kit" : "Create Kit"
              }
            />
            {/* only show delete button if editing a kit */}
            {this.props.match.params.kitID ? (
              <button
                className="create-master-button create-delete-button"
                type="button"
                onClick={() => {
                  this.setState({ showAlert: "delete" });
                }}
              >
                Delete Kit
              </button>
            ) : null}
          </div>
        </form>

        {this.state.showAlert !== "delete" && this.state.showAlert !== "" ? (
          <div className="alert-box">
            <div className="alert-text">
              {this.state.showAlert === "create"
                ? "New isolation kit created."
                : this.state.showAlert === "update"
                ? "Isolation kit updated."
                : "All fields must be filled."}
            </div>
            <button className="alert-button" onClick={this.handleAlert}>
              OK
            </button>
          </div>
        ) : null}

        {this.state.showAlert === "delete" ? (
          <div className="alert-box alert-delete">
            <div className="alert-text">
              Permanently delete
              <br /> this isolation kit?
            </div>
            <div className="alert-button-container">
              <button
                className="alert-button alert-button-cancel"
                onClick={() => this.setState({ showAlert: "" })}
              >
                Cancel
              </button>
              <button
                className="alert-button alert-button-delete"
                onClick={this.handleAlert}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}

        <Footer {...this.props} currComponent={"CreateOrEdit"} />
      </div>
    );
  }
}

export default CreateOrEdit;
