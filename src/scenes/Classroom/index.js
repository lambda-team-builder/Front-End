import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getClassroom, addProject, editClassroom } from '../../services/classroom/actions.js';
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
              {Object.entries(proj.roles).map(([role_name, slots]) => (
                <div key={role_name}>
                  {role_name}
                  {": "}
                  <span>
                    {slots.map(slot => <span key={slot.id}>{slot.user_name || "empty"}</span>)}
                    {" "}
                  </span>
                </div>
              ))}
            </span>
          </div>
        ))}
      </div>
      {modalTarget === "editClassroom" &&
       <Modal handleClose={closeModal}>
         <form onSubmit={handleEditClassroom}>
           <input type="text" name="name" palceholder="name"/>
           <button type="submit">Edit Classroom</button>
         </form>
       </Modal>
      }
    </div>
  );
};

const mapStateToProps = ({classroom}) => {
  return classroom;
};

export default connect(mapStateToProps, { getClassroom, addProject, editClassroom })(Classroom);
