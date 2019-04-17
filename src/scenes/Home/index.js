import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassrooms,
  createClassroom
} from "../../services/classrooms/actions.js";
import Error from "../../components/Error";
import { Link } from "react-router-dom";
import slugify from "slugify";
import Modal from "../../components/Modal";
import styled from "styled-components";

const classroomUrl = (id, name) => `/c/${id}/${slugify(name)}`;

const Home = props => {
  // Initial data fetch
  useEffect(() => {
    props.getClassrooms();
  }, []);
  const [filter, setFilter] = useState("");
  const handleFilter = event => setFilter(event.target.value);

  // Create classroom and navigate when state is update
  const handleCreateClassroom = event => {
    event.preventDefault();
    props
      .createClassroom({ name: event.target.name.value })
      .then(
        ({ payload }) =>
          payload && props.history.push(classroomUrl(payload.id, payload.name))
      );
    // hack to get redirect to work, because props.createdClassroom is still
    // bound to old value. Possible workaround is to set a state variable and
    // then subscribe to it with use effect
  };
  const [modalTarget, setModalTarget] = useState(null);
  const closeModal = () => setModalTarget(null);
  return (
    <StyledDiv>
      <StyledH1>Home</StyledH1>
      <div>
        <StyledButton onClick={() => setModalTarget("createClassroom")}>
          Create Classroom
        </StyledButton>

        {/* TODO: classrooms member of, searchable all classrooms, createClassrooms  */}
        <StyledH2>Classrooms</StyledH2>
        <Error error={props.classroomsError} />
        <StyledDiv className={props.gettingClassrooms ? "loading" : ""}>
          {props.classroomsArr
            .filter(cr => cr.name.toLowerCase().includes(filter.toLowerCase()))
            .map(cr => (
              <div key={cr.id}>
                <Link to={classroomUrl(cr.id, cr.name)}>{cr.name}</Link>
              </div>
            ))}
        </StyledDiv>
        <StyledInput onChange={handleFilter} placeholder="Search for a Class" />
      </div>
      {modalTarget && (
        <Modal handleClose={closeModal}>
          {(() => {
            switch (modalTarget) {
              case "createClassroom":
                return (
                  <StyledForm onSubmit={handleCreateClassroom}>
                    <StyledInput type="text" name="name" placeholder="name" />
                    <StyledButton type="submit">Create Classroom</StyledButton>
                  </StyledForm>
                );
              default:
                return null;
            }
          })()}
        </Modal>
      )}
    </StyledDiv>
  );
};

const mapStateToProps = ({ classrooms }) => {
  return classrooms;
};

export default connect(
  mapStateToProps,
  { getClassrooms, createClassroom }
)(Home);

const StyledH1 = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-weight: 100;
`;

const StyledH2 = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  margin: 10px 0;
  font-weight: 100;
`;

const StyledDiv = styled.div`
  width: auto;
  height: auto;
  border: solid 1px rgba(164, 164, 164, 0.488);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin: auto;
  margin: 20px 0;
  background-color: rgba(157, 157, 157, 0.071);
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: #b8d9f0;
  border: none;
  width: auto;
  color: black;
  margin: 10px;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  border: solid 1px #48484841;
  border-radius: 4px;
  font-weight: 100;
  outline: none;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledInput = styled.input`
  display: inline-block;
  background-color: rgb(255, 255, 255);
  border: none;
  width: auto;
  color: black;
  outline: none;
  margin: 5px;
  padding: 5px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  font-weight: 100;
  border: solid 1px #48484841;
  border-radius: 4px;
`;
