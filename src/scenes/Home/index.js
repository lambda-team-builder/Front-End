import React, { Component } from "react";
import { connect } from "react-redux";
import { add } from "../../services/session/actions";
import styled from "styled-components";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programType: ""
    };
  }

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddProgram = event => {
    event.preventDefault();
    const programType = this.state.programType;
    this.props.add({ programType: this.state.programType });
    this.setState({ programType: "" });
  };

  render() {
    return (
      <>
        <StyledForm onSubmit={this.handleAddProgram}>
          <StyledH2>Welcome User</StyledH2>
          <StyledH3>Your Classrooms</StyledH3>
          <p>{this.state.programType}</p>
          <input
            type="text"
            name="programType"
            placeholder="Name"
            value={this.state.programType}
            onChange={this.handleChanges}
          />
        </StyledForm>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { register: state.home, error: state.error };
};

export default connect(
  mapStateToProps,
  { add }
)(Home);

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

const StyledH2 = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-weight: 100;
`;

const StyledH3 = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  font-weight: 100;
`;
