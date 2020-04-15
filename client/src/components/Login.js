//the Login component persists at the top of the app to allow the user to see their login status and change it if needed. the user can enter the lab password and change access from 'visitor mode' to 'full access mode', which will allow rendering of 'edit' and 'create' kit buttons.
import React, { Component } from "react";
import apis from "../api";
import "./Login.css";

//THINGS TO DO

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

  handleSubmit = async (e, action) => {
    e.preventDefault();

    if (action === "login") {
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
          }
        })
        .catch((error) => {
          console.log("Login error:", error);
          this.setState({
            password: "",
            passwordPlaceholder: "Wrong password",
          });
        });
    } else if (action === "logout") {
      apis
        .logOut()
        .then((response) => {
          if (response.status === 200) {
            // update App.js state so user is logged out everywhere
            this.props.setLoggedInStatus(false);
          }
        })
        .catch((error) => {
          console.log("Login error: ");
          console.log(error);
        });
    }
  };

  // handleUpdate = () => {
  //   apis
  //     .updatePasscode({
  //       username: this.state.username,
  //       newPasscode: this.state.newPassword,
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("Updated password.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Update error: ");
  //       console.log(error);
  //     });
  // };

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
