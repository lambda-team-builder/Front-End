import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassroom, addProject, editClassroom, addUserToSlot, removeUserFromSlot, createSlot, getMembers,
  createRole, deleteSlot, updateProject, joinClassroom,
} from '../../services/classroom/actions.js';
import Modal from 'components/Modal';
import Admin from './scenes/Admin';
import Join from './scenes/Join';

const Classroom = props => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getClassroom(classroom_id);
  }, [classroom_id]);
  const admin = props.is_admin;
  if (props.id || props.id === 0) {
    if (admin === true) {
      return <Admin {...props} />;
    } else if (admin === false) {
      return <div>User</div>;
    }
  } else if (props.classroomError
             && props.classroomError.response
             && props.classroomError.response.status === 400){
    return (
      <Join classroom_id={classroom_id} joinClassroom={props.joinClassroom}/>
    );
  } 
  return <div>Loading</div>;
};

// =======
//   const handleAddProject = event => {
//     event.preventDefault();
//     props.addProject(classroom_id, {
//       name: event.target.name.value,
//       description: event.target.description.value
//     });
//   };
//   const [modalTarget, setModalTarget] = useState(null);
//   const closeModal = () => setModalTarget(null);
//   const handleEditClassroom = event => {
//     event.preventDefault();
//     props
//       .editClassroom(classroom_id, { name: event.target.name.value })
//       .then(({ payload }) => payload && closeModal());
//   };
//   const [editId, setEditId] = useState(null);

//   return (
//     <StyledDiv>
//       <StyledH1>{props.name}</StyledH1>
//       <StyledMenuContainer>
//         <StyledButton onClick={() => setModalTarget("editClassroom")}>
//           Edit Name
//         </StyledButton>
//         <form onSubmit={handleAddProject}>
//           <input type="text" name="name" placeholder="name" />
//           <input type="text" name="description" placeholder="description" />
//           <StyledButton type="submit">Add Project</StyledButton>
//         </form>
//       </StyledMenuContainer>
//       <StyledDiv2>
//         {props.projects.map(proj => (
//           <StyledDiv3 key={proj.id}>
//             <span>{proj.name}</span>
//             <span> Description: {proj.description.substring(0, 20)}...</span>
//             <span>
//               {proj.roles.map(({ name, slots, empty, id }) => (
//                 <div key={id}>
//                   {name + " (" + empty + "): "}
//                   <span>
//                     {slots.map(slot => (
//                       <span key={slot.id}>{slot.user_name || "empty"}</span>
//                     ))}{" "}
//                   </span>
//                 </div>
//               ))}
//             </span>
//             <button
//               onClick={() => {
//                 setModalTarget("editProject");
//                 setEditId(proj.id);
//               }}
//             >
//               Edit Project
//             </button>
//           </StyledDiv3>
//         ))}
//       </StyledDiv2>

//       {modalTarget && (
//         <ModalDiv>
//           <Modal handleClose={closeModal}>
//             {(() => {
//               switch (modalTarget) {
//                 case "editClassroom":
//                   return (
//                     <form onSubmit={handleEditClassroom}>
//                       <input type="text" name="name" palceholder="name" />
//                       <button type="submit">Edit Classroom</button>
//                     </form>
//                   );
//                 case "editProject":
//                   const project = props.projects.find(
//                     ({ id }) => id === editId
//                   );
//                   return (
//                     <ModleDivTwo>
//                       <form>
//                         <input
//                           type="text"
//                           name="name"
//                           placeholder="name"
//                           defaultValue={project.name}
//                         />
//                         <textarea
//                           name="description"
//                           placeholder="description"
//                           defaultValue={project.description}
//                         />
//                         <button type="submit" disabled>
//                           Submit Changes
//                         </button>
//                       </form>
//                       <h2>Roles</h2>
//                       {project.roles.map(({ name, slots, id: role_id }) => (
//                         <RolesSlot key={name}>
//                           <div>
//                             <h3>{name}</h3>
//                             <button
//                               onClick={() =>
//                                 props.createSlot(classroom_id, project.id, {
//                                   role_id
//                                 })
//                               }
//                             >
//                               Add Slot
//                             </button>
//                           </div>
//                           <hr />
//                           {slots.map(slot => {
//                             if (slot.user_name) {
//                               return (
//                                 <div key={slot.id}>
//                                   {slot.user_name}
//                                   <button
//                                     onClick={() =>
//                                       props.removeUserFromSlot(
//                                         classroom_id,
//                                         slot.id
//                                       )
//                                     }
//                                   >
//                                     Remove
//                                   </button>
//                                 </div>
//                               );
//                             } else {
//                               return <div key={slot.id}>Empty</div>;
//                             }
//                           })}
//                         </RolesSlot>
//                       ))}
//                       <button disabled>Add Role</button>
//                     </ModleDivTwo>
//                   );
//                 default:
//                   return null;
//               }
//             })()}
//           </Modal>
//         </ModalDiv>
//       )}
//     </StyledDiv>
//   );
// >>>>>>> master
// };

const mapStateToProps = ({ classroom }) => {
  return classroom;
};

export default connect(mapStateToProps, {
  getClassroom, addProject, editClassroom, addUserToSlot, removeUserFromSlot, createSlot,
  getMembers, createRole, deleteSlot, updateProject, joinClassroom,
})(Classroom);
// =======
// export default connect(
//   mapStateToProps,
//   {
//     getClassroom,
//     addProject,
//     editClassroom,
//     removeUserFromSlot,
//     createSlot
//   }
// )(Classroom);

// const StyledMenuContainer = styled.div`
//   margin-bottom: 10px;
//   button:first-child {
//     width: 268px;
//   }
//   input {
//     color: #1a1a1a;
//     font-size: 1rem;
//     border: none;
//     outline: none;
//     text-align: center;
//     padding: 5px 0;
//     width: 268px;
//     border: solid 1px #48484841;
//     border-radius: 4px;
//     margin-left: 10px;
//   }
// `;

// const StyledDiv = styled.div``;

// const StyledDiv2 = styled.div`
//   padding: 0 10px;
// `;

// const StyledDiv3 = styled.div`
//   padding: 20px;
//   background-color: #01394c;
//   margin-bottom: 10px;
//   span {
//     color: white;
//     font-weight: 200;
//     letter-spacing: 1px;
//   }
//   button {
//     display: block;
//     background: #006789;
//     color: white;
//     border: none;
//     width: 75px;
//     margin-top: 10px;
//     padding: 5px 0;
//     text-align: center;
//     text-decoration: none;
//     font-size: 0.7rem;
//     border-radius: 4px;
//     font-weight: 400;
//     outline: none;
//     &:hover {
//       background: #008dbc;
//       box-shadow: 3px 4px 8px 1px #001e28;
//     }
//   }
// `;

// const StyledH1 = styled.h1`
//   color: #ffffff;
//   display: flex;
//   justify-content: center;
//   font-weight: 100;
// `;

// const StyledButton = styled.button`
//   background: linear-gradient(
//     15deg,
//     rgba(213, 212, 208, 1) 0%,
//     rgba(238, 238, 236, 1) 57%,
//     rgba(233, 233, 231, 1) 100%
//   );
//   border: none;
//   width: 200px;
//   color: black;
//   margin: 10px;
//   padding: 5px 20px;
//   text-align: center;
//   text-decoration: none;
//   font-size: 1rem;
//   border: solid 1px #48484841;
//   border-radius: 4px;
//   font-weight: 100;
//   outline: none;
// `;

// const ModalDiv = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 800px;
//   height: 100vh;
//   background: #1a1a1a66;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   z-index: 10;
//   form {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//   }
//   input {
//     box-sizing: border-box;
//     background-color: rgb(255, 255, 255);
//     border: none;
//     width: 200px;
//     color: black;
//     outline: none;
//     margin: 10px;
//     padding: 5px 15px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 1rem;
//     font-weight: 100;
//     border: solid 1px #48484841;
//     border-radius: 4px;
//   }
//   button {
//     background: #006789;
//     box-sizing: border-box;
//     color: white;
//     border: none;
//     width: 200px;
//     margin: 10px;
//     padding: 10px 15px;
//     text-align: center;
//     text-decoration: none;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     align-content: center;
//     font-size: 1rem;
//     border: solid 1px #48484841;
//     border-radius: 4px;
//     outline: none;
//     &:hover {
//       background: #008dbc;
//       box-shadow: 3px 4px 8px 1px #001e28;
//     }
//   }
// `;

// const ModleDivTwo = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   background: #13131388;
//   border-radius: 8px;
//   width: 50%;
//   h2 {
//     color: white;
//   }
//   textarea {
//     resize: none;
//     width: 200px;
//     height: 100px;
//     margin: 10px;
//     padding: 10px 15px;
//     box-sizing: border-box;
//     background: transparent;
//     color: white;
//     font-size: 1rem;
//   }
//   form {
//     display: flex;
//     justify-content: center;
//   }
//   h3 {
//     color: white;
//   }
//   div {
//     color: white;
//   }
//   button {
//     display: block;
//     background: #006789;
//     color: white;
//     border: none;
//     width: 100px;
//     margin-top: 10px;
//     padding: 4px 0;
//     text-align: center;
//     text-decoration: none;
//     font-size: 0.7rem;
//     border-radius: 4px;
//     font-weight: 400;
//     outline: none;
//     &:hover {
//       background: #008dbc;
//       box-shadow: 3px 4px 8px 1px #001e28;
//     }
//   }
// `;

// const RolesSlot = styled.div`
//   display: flex;
//   flex-direction: column;

//   align-items: baseline;
//   div {
//     width: 100%;
//     display: flex;
//     margin-bottom: 0;
//     padding: 0;
//     justify-content: space-between;
//     align-items: center;
//   }
//   button:first-child {
//   }
//   hr {
//     width: 100%;
//     margin: 0;
//     padding: 0;
//     border: 0;
//     height: 1px;
//     background-image: linear-gradient(
//       to right,
//       rgba(225, 225, 225, 0),
//       rgba(225, 255, 255, 0.75),
//       rgba(0, 0, 0, 0)
//     );
//   }
//   div:first-child {
//     margin-bottom: 0px;
//   }
//   div:not(:first-child) {
//     margin-top: 30px;
//   }
// `;
// >>>>>>> master
