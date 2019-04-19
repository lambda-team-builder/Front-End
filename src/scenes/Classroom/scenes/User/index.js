import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import ProjectCard from 'components/ProjectCard';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Header, ButtonSmallSubtle, colors
} from 'styles';

const User = (props) => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getMembers(classroom_id);
  }, [classroom_id]);
  const [modalTarget, setModalTarget] = useState(null);
  const [viewId, setViewId] = useState(null);
  const closeModal = () => setModalTarget(null);
  return (
    <div>
      <Header>
        <div style={{display: "flex", alignItems: "center"}}>
          <Link to="/home">
            <ButtonSmallSubtle>
              home
            </ButtonSmallSubtle>
          </Link>
        </div>
        <h1>{props.name}</h1>
        <div style={{display: "flex", alignItems: "center"}}>
          <ButtonSmallSubtle bg={colors.thunderhead}>
            leave
          </ButtonSmallSubtle>
        </div>
      </Header>
      <CardsContainer>
        {props.projects.map(project => (
          <ProjectCard key={project.id}
                       project={project}
                       user_id={props.user_id}
                       onClick={() => {setModalTarget("viewProject"); setViewId(project.id);}}/>
        ))}
      </CardsContainer>
      {modalTarget &&
       <Modal handleClose={closeModal} width="800px">
         {(() => {
           switch (modalTarget) {
           case "viewProject":
             const project = props.projects.find(({id}) => id === viewId);
             return (
               <div>
                 <h2>{project.name}</h2>
                 <div>{project.description}</div>
                 <h2>Roles</h2>
                 <RolesContainer>
                   {project.roles.map(({name, slots, id: role_id}) => (
                     <RoleDiv key={role_id}>
                       <h3 style={{margin: "0", padding: "0"}}>
                         {name}
                       </h3>
                       {slots.map(slot => {
                         console.log(props.user_id);
                         if (props.user_id && slot.user_id === props.user_id) {
                           return (
                             <div key={slot.id}>
                               <span style={{color: colors.antimatter, textDecoration: "underline"}}>
                                 {slot.user_name}
                               </span>
                               {"    "}
                               <ButtonSmallSubtle
                                 onClick={() => props.leaveSlot(classroom_id, slot.id)}>
                                 leave
                               </ButtonSmallSubtle>
                             </div>
                           );
                         } else if (slot.user_name) {
                           return (
                             <div key={slot.id}>{slot.user_name}</div>
                           );
                         } else {
                           return (
                             <div key={slot.id}>
                               <ButtonSmallSubtle
                                 onClick={() => props.joinSlot(classroom_id, slot.id)}>
                                 join
                               </ButtonSmallSubtle>
                             </div>
                           );
                         }
                       })}
                     </RoleDiv>
                   ))}
                 </RolesContainer>
               </div>
             );
           default:
             return null;
           }})()}
       </Modal>
      }
    </div>
  );
};

const RolesContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
`;

const RoleDiv = styled.div`
  max-width: 300px;
  width: 100%;
  padding-bottom: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export default User;
