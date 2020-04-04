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

  handleSubmit = async event => {
    event.preventDefault();

    apis
      .logIn({
        username: "admin",
        password: "BioIVT#friends"
      })
      .then(response => {
        if (response.status === 200) {
          // update App.js state so user is logged in everywhere
          this.props.setLoggedIn();
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <button className="nav-button" onClick={this.handleSubmit}>
          Log In
        </button>

        <div>{this.props.loggedIn ? "Full Access Mode" : "Visitor Mode"}</div>
      </div>
    );
  }
}

export default Login;
