import React, { Component } from "react";
import LinkButton from "./LinkButton.jsx";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      species: "",
      constants: []
    };
  }

  handleInput = async e => {
    await this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    alert("A name was submitted: " + this.state.value);
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
                  <td colSpan={2}>Multipliers/Constants</td>
                </tr>
                {this.state.constants.map((constantRow, idx) => (
                  <tr>
                    <td align="right">
                      <input
                        type="text"
                        list="constants-names"
                        name={`constant ${idx}`}
                        onChange={this.handleInput}
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
                        name="species"
                        onChange={this.handleInput}
                        autoComplete="off"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button>Add Multiplier/Constant</button>
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
