import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../services/session/actions";
import styled from "styled-components";
import Error from '../../components/Error';
import { AuthCard, CenteredDiv, Button, Spinner, ButtonSmallSubtle, colors } from '../../styles';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRegister = event => {
    event.preventDefault();
    this.props.register({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    }).then(() => this.props.authenticated && this.props.history.push("/home"));
  };

  render() {
    return (
      <CenteredDiv>
        <AuthCard>
          <StyledForm className="FormRegister">
            <StyledH2>Team Builder Register</StyledH2>
            <Error error={this.props.registrationError}/>
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
            <StyledInput
              type="text"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChanges}
            />
            <br />
            <Button onClick={this.handleRegister} type="submit">
              Register
              {this.props.registering && <Spinner />}
            </Button>
            <Link to="/login">
              <ButtonSmallSubtle bg={colors.thunderhead}>
                login
              </ButtonSmallSubtle>
            </Link>
          </StyledForm>
        </AuthCard>
      </CenteredDiv>
    );
  }
}

const mapStateToProps = ({session}) => {
  const { registering, registrationError, authenticated } = session;
  return { registering, registrationError, authenticated };
};

export default connect(
  mapStateToProps,
  { register }
)(Register);

const StyledForm = styled.form`
  width: 348px;
  height: 363px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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

const StyledH2 = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-weight: 100;
`;
