import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import EditProject from './components/EditProject';
import {
  Button, BasicForm, BasicInput, Header, ButtonSmallSubtle, colors, Card, BasicTextarea
} from 'styles';
import ButtonSpinner from 'components/ButtonSpinner';
import ProjectCard from 'components/ProjectCard';

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
      <Header>
        <h1>
          {props.name}
          <ButtonSmallSubtle onClick={() => setModalTarget("editClassroom")}>
            edit
          </ButtonSmallSubtle>
        </h1>
        <div style={{display: "flex", alignItems: "center"}}>
          <ButtonSmallSubtle bg={colors.thunderhead}
                             style={{margin: "0"}} >
            settings
          </ButtonSmallSubtle>
        </div>
      </Header>
      <Button onClick={() => setModalTarget("addProject")}>Add Project</Button>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "flex-start"}}>
        {props.projects.map(project => (
          <ProjectCard key={project.id}
                       project={project}
                       onClick={() => {setModalTarget("editProject"); setEditId(project.id);}}/>
        ))}
      </div>
      {modalTarget &&
       <Modal handleClose={closeModal} width="800px">
         {(() => {
           switch (modalTarget) {
           case "editClassroom":
             return (
               <BasicForm onSubmit={handleEditClassroom}>
                 <h2>Edit Classroom Name</h2>
                 <BasicInput type="text" name="name" palceholder="name" defaultValue={props.name}/>
                 <ButtonSpinner type="submit"
                                loading={props.editingClassroom}>
                   edit
                 </ButtonSpinner>
               </BasicForm>
             );
           case "editProject":
             const project = props.projects.find(({id}) => id === editId);
             return (
               <EditProject {...{project, classroom_id, }} {...props} />
             );
           case "addProject":
             return (
               <BasicForm onSubmit={handleAddProject}>
                 <h2>Add Project</h2>
                 <BasicInput type="text" name="name" placeholder="name"/>
                 <BasicTextarea type="text" name="description" placeholder="description"/>
                 <Button type="submit">Add Project</Button>
               </BasicForm>
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
