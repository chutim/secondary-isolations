import React, { Component } from "react";
import apis from "../api";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (e, action) => {
    e.preventDefault();

    if (action === "login") {
      apis
        .logIn({
          username: "admin",
          password: "BioIVT#friends"
        })
        .then(response => {
          if (response.status === 200) {
            // update App.js state so user is logged in everywhere
            this.props.setLoggedInStatus(true);
          }
        })
        .catch(error => {
          console.log("login error: ");
          console.log(error);
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
        <button
          className="nav-button"
          onClick={e => {
            this.handleSubmit(e, "login");
          }}
        >
          Log In
        </button>
        <button
          className="nav-button"
          onClick={e => {
            this.handleSubmit(e, "logout");
          }}
        >
          Log Out
        </button>

        <div>{this.props.loggedIn ? "Full Access Mode" : "Visitor Mode"}</div>
      </div>
    );
  }
}

export default Login;
