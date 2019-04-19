import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../services/session/actions";
import styled from "styled-components";
import Error from '../../components/Error';
import { AuthCard, CenteredDiv, Button, Spinner, ButtonSmallSubtle, colors } from '../../styles';
import { Link } from 'react-router-dom';

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
    }).then(() => this.props.authenticated && this.props.history.push("/home"));
  };

  render() {
    return (
      <CenteredDiv>
        <AuthCard>
          <StyledForm>
            <StyledH2>Team Builder Login</StyledH2>
            <Error error={this.props.authenticationError}/>
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
            <Button onClick={this.handleLogin} type="submit">
              Log In
              {this.props.authenticating && <Spinner />}
            </Button>
            <Link to="/register">
              <ButtonSmallSubtle bg={colors.thunderhead}>
                register
              </ButtonSmallSubtle>
            </Link>
          </StyledForm>
        </AuthCard>
      </CenteredDiv>
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledInput = styled.input`
  color: #1a1a1a;
  font-size: 1rem;
  border: none;
  outline: none;
  text-align: center;
  height: 40px;
  width: 268px;
  margin: 5px 0;
  border: solid 1px #48484841;
  border-radius: 4px;
`;

const StyledH2 = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-weight: 100;
`;
