import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassrooms,
  createClassroom,
  getAdminClassrooms,
  getMemberProjects
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
    props.getAdminClassrooms();
    props.getMemberProjects();
  }, []);
  const [filter, setFilter] = useState("");
  const handleFilter = event => setFilter(event.target.value);

  // Create classroom and navigate when state is update
  const handleCreateClassroom = event => {
    event.preventDefault();
    props
      .createClassroom({
        name: event.target.name.value,
        password: event.target.password.value
      })
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
      <StyledDiv2>
        <StyledH2>Classrooms</StyledH2>
        <div className="header">
          <div className="row">
            <StyledButton onClick={() => setModalTarget("createClassroom")}>
              Create Classroom
            </StyledButton>
            <StyledInput
              onChange={handleFilter}
              placeholder="Search for a Class"
            />
          </div>
          {/* <div>
          {props.adminClassrooms.map(cr => (
            <div key={cr.id}>
              <Link to={classroomUrl(cr.id, cr.name)}>{cr.name}</Link>
            </div>
          ))}
          {props.memberProjects.map(project => (
            <div key={project.classroom_project_id}>
              <Link
                to={classroomUrl(project.classroom_id, project.classroom_name)}
              >
                {project.project_name} - {project.role_name}
              </Link>
            </div>
          ))}
        </div> */}
        </div>
        <Error error={props.classroomsError} />
        <StyledDiv3 className={props.gettingClassrooms ? "loading" : ""}>
          {props.classroomsArr
            .filter(cr => cr.name.toLowerCase().includes(filter.toLowerCase()))
            .map(cr => (
              <StyledDiv4 key={cr.id}>
                <Link to={classroomUrl(cr.id, cr.name)}>{cr.name}</Link>
              </StyledDiv4>
            ))}
        </StyledDiv3>
      </StyledDiv2>
      {modalTarget && (
        <Modal handleClose={closeModal}>
          {(() => {
            switch (modalTarget) {
              case "createClassroom":
                return (
                  <StyledForm onSubmit={handleCreateClassroom}>
                    <StyledInput type="text" name="name" placeholder="name" />
                    <StyledInput
                      type="password"
                      name="password"
                      placeholder="password"
                    />
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
  {
    getClassrooms,
    createClassroom,
    getAdminClassrooms,
    getMemberProjects
  }
)(Home);

const StyledH1 = styled.h1`
  display: block;
  font-size: 2rem;
  color: #ffffff;
  margin: 0;
  letter-spacing: 1px;
`;

const StyledH2 = styled.h2`
  display: flex;
  color: #ffffff;
  justify-content: center;
  font-size: 1.6rem;
  margin: 10px 0;
  letter-spacing: 1px;
`;

const StyledDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 20px auto;
  padding: 10px;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #8bb0c055;
    width: 100%;
    margin-top: 0;
    position: sticky;
    top: 0;
  }
  .row {
    display: flex;
  }
`;

const StyledDiv2 = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 20px auto;
  background: #8bb0c0;
  box-shadow: 1px 1px 10px 1px black;
  /* padding: 10px; */
`;

const StyledDiv3 = styled.div`
  display: flex;
  width: 75%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 20px auto;
  padding: 10px 30px;
  border-radius: 8px;
`;

const StyledDiv4 = styled.div`
  a {
    color: #ffb11c;
    text-decoration: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0px 0px 3px 0px black;
  background: #ffffff;
  margin: 20px 10px;
  width: 150px;
  height: 150px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s;
  box-shadow: 1px 1px 5px 1px #003547;
  &:hover {
    background: rgb(255, 255, 255, 0.9);
    box-shadow: 3px 4px 3px 2px #003547;
  }
`;

const StyledButton = styled.button`
  background: #002733;
  box-sizing: border-box;
  color: white;
  border: none;
  width: 200px;
  margin: 10px;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 1rem;
  border: solid 1px #48484841;
  border-radius: 4px;
  outline: none;
  &:hover {
    background: #22586f;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 200px;
  color: black;
  outline: none;
  margin: 10px;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  font-weight: 100;
  border: solid 1px #48484841;
  border-radius: 4px;
`;
