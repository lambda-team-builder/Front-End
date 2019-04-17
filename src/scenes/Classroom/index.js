import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getClassroom, addProject, editClassroom, removeUserFromSlot, createSlot
} from '../../services/classroom/actions.js';
import Modal from '../../components/Modal';

const Classroom = (props) => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getClassroom(classroom_id);
  }, [classroom_id]);
  const handleAddProject = event => {
    event.preventDefault();
    props.addProject(classroom_id, {name: event.target.name.value,
                                    description: event.target.description.value});
  };
  const [modalTarget, setModalTarget] = useState(null);
  const closeModal = () => setModalTarget(null);
  const handleEditClassroom = event => {
    event.preventDefault();
    props.editClassroom(classroom_id, {name: event.target.name.value})
      .then(({payload}) => payload && closeModal());
  };
  const [editId, setEditId] = useState(null);
  return (
    <div>
      <h1>{props.name}</h1>
      <button onClick={() => setModalTarget("editClassroom")}>Edit Name</button>
      <form onSubmit={handleAddProject}>
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="description" placeholder="description"/>
        <button type="submit">Add Project</button>
      </form>
      <div>
        {props.projects.map(proj => (
          <div key={proj.id}>
            <span>{proj.name}</span>
            <span> Description: {proj.description.substring(0, 20)}...</span>
            <span>
              {proj.roles.map(({name, slots, empty, id}) => (
                <div key={id}>
                  {name + " (" + empty + "): "}
                  <span>
                    {slots.map(slot => <span key={slot.id}>{slot.user_name || "empty"}</span>)}
                    {" "}
                  </span>
                </div>
              ))}
            </span>
            <button onClick={() => {setModalTarget("editProject"); setEditId(proj.id);}}>
              Edit Project</button>
          </div>
        ))}
      </div>
      {modalTarget &&
       <Modal handleClose={closeModal}>
         {(() => {
           switch (modalTarget) {
           case "editClassroom":
             return (
               <form onSubmit={handleEditClassroom}>
                 <input type="text" name="name" palceholder="name"/>
                 <button type="submit">Edit Classroom</button>
               </form>
             );
           case "editProject":
             const project = props.projects.find(({id}) => id === editId);
             return (
               <div style={{background: "white"}}>
               <form>
                 <input type="text" name="name" placeholder="name" defaultValue={project.name}/>
                 <textarea name="description" placeholder="description" defaultValue={project.description}/>
                 <button type="submit" disabled>Submit Changes</button>
               </form>
                 <h2>Roles</h2>
                 {project.roles.map(({name, slots}) => (
                   <div key={name}>
                     <div>{name}</div>
                     {slots.map(slot => {
                       if (slot.user_name) {
                         return <div key={slot.id}>
                                  {slot.user_name}
                                  <button onClick={() => (
                                    props.removeUserFromSlot(classroom_id, slot.id)
                                  )}>
                                    Remove
                                  </button>
                                </div>;
                       } else {
                         return <div key={slot.id}>
                                  Empty
                                </div>;
                       }
                     })}
                     <button onClick={() => props.createSlot(classroom_id, project.id, {})}>Add Slot</button>
                   </div>
                 ))}
                 <button disabled>Add Role</button>
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

const mapStateToProps = ({classroom}) => {
  return classroom;
};

export default connect(mapStateToProps, {
  getClassroom, addProject, editClassroom, removeUserFromSlot, createSlot
})(Classroom);
