import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../services/session/actions";
import styled from "styled-components";
import { getErrorMessage } from '../../services/helper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    })
      .then(() => this.props.authenticated && this.props.history.push("/"));
  };

  render() {
    return (
      <StyledForm>
        <StyledH2>Team Builder Login</StyledH2>
        {this.props.authenticationError
         && <Error>{getErrorMessage(this.props.authenticationError)}</Error>}
        <StyledInput
          type="text"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChanges}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChanges}
        />{" "}
        <br />
        <StyledButton onClick={this.handleLogin}
                      className={this.props.authentication ? "loading" : ""}>
          Log In
        </StyledButton>
      </StyledForm>
    );
  }
}

const mapStateToProps = ({session}) => {
  const { authenticating, authenticationError, authenticated } = session;
  return { authenticating, authenticationError, authenticated };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);

const StyledForm = styled.form`
  width: 348px;
  height: 363px;
  border: solid 1px rgba(164, 164, 164, 0.488);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  margin: auto;
  margin-top: 100px;
  background-color: rgba(157, 157, 157, 0.071);
`;

const StyledInput = styled.input`
  background-color: rgb(255, 255, 255);
  color: #1a1a1a;
  font-size: 1rem;
  border: none;
  font-weight: 100;
  outline: none;
  text-align: center;
  height: 40px;
  width: 268px;
  margin: 5px 0;
  border: solid 1px #48484841;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  background-color: #b8d9f0; /* Green */
  border: none;
  width: 268px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: solid 1px #48484841;
  border-radius: 4px;
`;

const StyledH2 = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-weight: 100;
`;

const Error = styled.div`
  color: red;
`;
