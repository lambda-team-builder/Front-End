import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassrooms,
  createClassroom,
  getAdminClassrooms,
  getMemberProjects,
  getUserClassrooms
} from "../../services/classrooms/actions.js";
import { logout } from '../../services/session/actions.js';
import { Link } from "react-router-dom";
import slugify from "slugify";
import Modal from "../../components/Modal";
import styled from "styled-components";
import { Header, Button, ButtonSmallSubtle, Card, colors, BasicInput } from '../../styles';
import ButtonSpinner from '../../components/ButtonSpinner';

const classroomUrl = (id, name) => `/c/${id}/${slugify(name)}`;

const Home = props => {
  // Initial data fetch
  useEffect(() => {
    props.getClassrooms();
    props.getAdminClassrooms();
    props.getUserClassrooms();
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
    <div>
      <Header>
        <div style={{width: "100%"}}></div>
        <h1>Home</h1>
        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
          <ButtonSmallSubtle onClick={() => props.logout(props.history)}>
            logout
          </ButtonSmallSubtle>
        </div>
      </Header>
      <div>
        <Button onClick={() => setModalTarget("createClassroom")}>
          Create Classroom
        </Button>
        {props.memberProjects.length !== 0 &&
            <div>
              <StyledH2>Projects</StyledH2>
              <ClassroomContainer>
                {props.memberProjects.map((project, i) => (
                  <LinkNoDec key={i} // hack, but no guaranteed unique data
                        to={classroomUrl(project.classroom_id, project.classroom_name)}>
                    <ClassroomCard>
                      <RoleName>{project.role_name}</RoleName>
                      <ClassroomName>{project.classroom_name}</ClassroomName>
                      <ProjectName>{project.project_name}</ProjectName>
                    </ClassroomCard>
                  </LinkNoDec>
                ))}
              </ClassroomContainer>
            </div>}
        {props.adminClassrooms.length !== 0 &&
            <div>
              <StyledH2>Admin Classrooms</StyledH2>
              <ClassroomContainer>
                {props.adminClassrooms.map(({classroom_id, classroom_name}) => (
                  <LinkNoDec key={classroom_id} to={classroomUrl(classroom_id, classroom_name)}>
                    <ClassroomCard>
                      <ClassroomName>
                        {classroom_name}
                      </ClassroomName>
                    </ClassroomCard>
                  </LinkNoDec>
                ))}
              </ClassroomContainer>
            </div>}
        {props.userClassrooms.length !== 0 &&
            <div>
              <StyledH2>User Classrooms</StyledH2>
              <ClassroomContainer>
                {props.userClassrooms.map(({classroom_id, classroom_name}) => (
                  <LinkNoDec key={classroom_id} to={classroomUrl(classroom_id, classroom_name)}>
                    <ClassroomCard>
                      <ClassroomName>
                        {classroom_name}
                      </ClassroomName>
                    </ClassroomCard>
                  </LinkNoDec>
                ))}
              </ClassroomContainer>
            </div>}
        <div>
          <div>
            <StyledH2>Classroom Search</StyledH2>
            <BasicInput style={{margin: "0 auto", display: "block"}}
              onChange={handleFilter}
              placeholder="search"
            />
          <ClassroomContainer>
            {filter.trim() !== "" &&
             props.classroomsArr
             .filter(cr => cr.name.toLowerCase().includes(filter.trim().toLowerCase()))
             .slice(0, 10)
             .map(cr => (
               <LinkNoDec key={cr.id} to={classroomUrl(cr.id, cr.name)}>
                 <ClassroomCard>
                   <ClassroomName>
                     {cr.name}
                   </ClassroomName>
                 </ClassroomCard>
               </LinkNoDec>
             ))}
          </ClassroomContainer>
          </div>
        </div>
        <div>
        </div>
      </div>
      {modalTarget && (
        <Modal handleClose={closeModal}>
          {(() => {
            switch (modalTarget) {
            case "createClassroom":
              return (
                <StyledForm onSubmit={handleCreateClassroom}>
                  <h2 style={{textAlign: "center", width: "100%"}}>Create Clasroom</h2>
                  <StyledInput type="text" name="name" placeholder="name" />
                  <StyledInput
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <ButtonSpinner type="submit"
                                 bg={colors.antimatter}
                                 loading={props.creatingClassroom}>
                    create
                  </ButtonSpinner>
                </StyledForm>
              );
            default:
              return null;
            }
          })()}
        </Modal>
      )}
    </div>
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
    getMemberProjects,
    logout,
    getUserClassrooms
  }
)(Home);

const StyledH2 = styled.h2`
  display: flex;
  color: #ffffff;
  justify-content: center;
  font-size: 1.6rem;
  margin: 20px 0 10px 0;
  letter-spacing: 1px;
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

const LinkNoDec = styled(Link)`
  text-decoration: none;
`;

const ClassroomCard = styled(Card)`
  display: inline-block;
  padding: 10px;
  margin: 10px;
  transition: background 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  &:hover {
    background: #C4C4C6;
  }
`;

const ClassroomContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  * {
  margin-bottom: 2px;
  }
`;

const ProjectName = styled.div`
  font-weight: bold;
  box-shadow: 0 -10px 0 ${colors.thunderhead + "66"} inset, 
              0 -1px 0 ${colors.thunderhead} inset;
          
`;

const ClassroomName = styled.div`
  font-weight: bold;
  font-variant: small-caps;
`;

const RoleName = styled.div `
  background: ${colors.reflection};
  padding: 6px 10px;
  color: ${colors.turbulence};
  box-shadow: 0 -5px 0 ${colors.antimatter} inset;
  font-weight: bold;
  border-radius: 5px;
  margin: 5px 10px;
`;
