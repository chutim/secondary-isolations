//the Login component persists at the top of the app. the user can enter the lab password and change access from 'visitor' to 'full access', which will allow rendering/use of 'edit' and 'create' kit buttons.
import React, { Component } from "react";
import apis from "../api";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "labmin",
      password: "",
      passwordPlaceholder: "",
      // newPassword: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e, action) => {
    e.preventDefault();
    if (action === "login") {
      this.logIn();
    } else if (action === "logout") {
      this.logOut();
    }
  };

  logIn = () => {
    if (this.state.password === "")
      return this.setState({
        passwordPlaceholder: "Please type a password",
      });

    apis
      .logIn({
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        if (response.status === 200) {
          // update App.js state so user is logged in everywhere
          this.props.setLoggedInStatus(true);
          this.setState({ password: "", passwordPlaceholder: "" });
          console.log("Logged in.");
        }
      })
      .catch((error) => {
        console.log("Login error:", error);
        this.setState({
          password: "",
          passwordPlaceholder: "Wrong password",
        });
      });
  };

  logOut = () => {
    apis
      .logOut()
      .then((response) => {
        if (response.status === 200) {
          // update App.js state so user is logged out everywhere
          this.props.setLoggedInStatus(false);
          console.log("Logged out.");
        }
      })
      .catch((error) => {
        console.log("Login error: ");
        console.log(error);
      });
  };

  //toggle this function and the div in render, to update password
  /*
  handleUpdate = () => {
    apis
      .updatePasscode({
        username: this.state.username,
        newPasscode: this.state.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Updated password.");
        }
      })
      .catch((error) => {
        console.log("Update error: ");
        console.log(error);
      });
  };
  // */

  render() {
    return (
      <div className="login-container">
        <div className="login-mode">
          {this.props.loggedIn ? "Full Access" : "Visitor"}
        </div>
        {/* <div>
          <input onChange={this.handleChange} name="newPassword"></input>
          <button onClick={this.handleUpdate}>update</button>
        </div> */}
        <div className="login-input-container">
          <input
            className="login-input"
            onChange={this.handleChange}
            name="password"
            autoComplete="off"
            value={this.state.password}
            placeholder={this.state.passwordPlaceholder}
          ></input>
          <button
            className={
              this.props.loggedIn
                ? "login-button logged-in-button"
                : "login-button logged-out-button"
            }
            onClick={(e) => {
              this.handleSubmit(e, this.props.loggedIn ? "logout" : "login");
            }}
          >
            {this.props.loggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
