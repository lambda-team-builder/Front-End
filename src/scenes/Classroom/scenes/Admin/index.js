import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import EditProject from './components/EditProject';

const Admin = (props) => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getMembers(classroom_id);
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
  const [addSlotId, setAddSlotId] = useState(null);
  const [addingRole, setAddingRole] = useState(false);
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
       <Modal handleClose={closeModal} width="800px">
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
               <EditProject {...{project, classroom_id, }} {...props} />
             );
           default:
             return null;
           }})()}
       </Modal>
      }
    </div>
  );
};

export default Admin;
