import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import { cloneDeep } from "lodash";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      species: "",
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
    //if we're modifying a constant name, modify the corresponding sub-array on state
    if (constantNameOrValue) {
      constantNameOrValue === "constantName"
        ? (constants[constantRow][0] = e.target.value)
        : (constants[constantRow][1] = e.target.value);
      await this.setState({ constants });
    }
    //otherwise we are not dealing with constants, just update the appropriate fields
    else {
      await this.setState({ [e.target.name]: e.target.value });
    }
    console.log(this.state);
    this.updateLocalStorage();
  };

  handleSubmit = e => {
    e.preventDefault();
    alert("A name was submitted: " + this.state.value);
    localStorage.clear();
  };

  addConstant = async () => {
    await this.setState({ constants: [...this.state.constants, [null, null]] });
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
                        value={constantRow[0]}
                        placeholder={constantRow[0] ? "" : "Kit Reagent (µL)"}
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
                        value={constantRow[1]}
                        placeholder={constantRow[1] ? "" : "123"}
                        autoComplete="off"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={this.addConstant}>
              Add Constant
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
