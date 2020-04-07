import React, { Component } from "react";
import apis from "../api";
import "./Login.css";

//THINGS TO DO

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "admin",
      password: "",
      passwordPlaceholder: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e, action) => {
    e.preventDefault();

    if (action === "login") {
      if (this.props.loggedIn) {
        return this.setState({
          password: "",
          passwordPlaceholder: "Already logged in!"
        });
      } else if (this.state.password === "")
        return this.setState({
          passwordPlaceholder: "Password needed!"
        });
      apis
        .logIn({
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          if (response.status === 200) {
            // update App.js state so user is logged in everywhere
            this.props.setLoggedInStatus(true);
            this.setState({ password: "", passwordPlaceholder: "" });
          }
        })
        .catch(error => {
          console.log("Login error:", error);
          this.setState({
            password: "",
            passwordPlaceholder: "Wrong password!"
          });
        });
    } else if (action === "logout") {
      apis
        .logOut()
        .then(response => {
          if (response.status === 200) {
            // update App.js state so user is logged out everywhere
            this.props.setLoggedInStatus(false);
          }
        })
        .catch(error => {
          console.log("login error: ");
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
          name="password"
          autoComplete="off"
          value={this.state.password}
          placeholder={this.state.passwordPlaceholder}
        ></input>
        <button
          className="nav-button"
          onClick={e => {
            this.handleSubmit(e, this.props.loggedIn ? "logout" : "login");
          }}
        >
          {this.props.loggedIn ? "Log Out" : "Log In"}
        </button>

        <div>{this.props.loggedIn ? "Full Access Mode" : "Visitor Mode"}</div>
      </div>
    );
  }
}

export default Login;
