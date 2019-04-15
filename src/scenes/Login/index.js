import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = () => {
    const user = this.state.username;
    localStorage.setItem("user", user);
  };

  render() {
    return (
      <form className="FormLogin">
        <h2>Team Builder Login</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChanges}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChanges}
        />{" "}
        <br />
        <button onClick={this.handleLogin}>Log In</button>
      </form>
    );
  }
}

export default Login;
