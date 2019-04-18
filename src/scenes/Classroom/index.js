import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassroom,
  addProject,
  editClassroom,
  removeUserFromSlot,
  createSlot
} from "../../services/classroom/actions.js";
import Modal from "../../components/Modal";
import styled from "styled-components";

const Classroom = props => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getClassroom(classroom_id);
  }, [classroom_id]);
  const handleAddProject = event => {
    event.preventDefault();
    props.addProject(classroom_id, {
      name: event.target.name.value,
      description: event.target.description.value
    });
  };
  const [modalTarget, setModalTarget] = useState(null);
  const closeModal = () => setModalTarget(null);
  const handleEditClassroom = event => {
    event.preventDefault();
    props
      .editClassroom(classroom_id, { name: event.target.name.value })
      .then(({ payload }) => payload && closeModal());
  };
  const [editId, setEditId] = useState(null);
  return (
    <StyledDiv>
      <StyledH1>{props.name}</StyledH1>
      <StyledButton onClick={() => setModalTarget("editClassroom")}>
        Edit Name
      </StyledButton>
      <form onSubmit={handleAddProject}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="description" placeholder="description" />
        <button type="submit">Add Project</button>
      </form>
      <StyledDiv2>
        {props.projects.map(proj => (
          <StyledDiv3 key={proj.id}>
            <span>{proj.name}</span>
            <span> Description: {proj.description.substring(0, 20)}...</span>
            <span>
              {proj.roles.map(({ name, slots, empty, id }) => (
                <div key={id}>
                  {name + " (" + empty + "): "}
                  <span>
                    {slots.map(slot => (
                      <span key={slot.id}>{slot.user_name || "empty"}</span>
                    ))}{" "}
                  </span>
                </div>
              ))}
            </span>
            <button
              onClick={() => {
                setModalTarget("editProject");
                setEditId(proj.id);
              }}
            >
              Edit Project
            </button>
          </StyledDiv3>
        ))}
      </StyledDiv2>
      {modalTarget && (
        <Modal handleClose={closeModal}>
          {(() => {
            switch (modalTarget) {
              case "editClassroom":
                return (
                  <form onSubmit={handleEditClassroom}>
                    <input type="text" name="name" palceholder="name" />
                    <button type="submit">Edit Classroom</button>
                  </form>
                );
              case "editProject":
                const project = props.projects.find(({ id }) => id === editId);
                return (
                  <div style={{ background: "white" }}>
                    <form>
                      <input
                        type="text"
                        name="name"
                        placeholder="name"
                        defaultValue={project.name}
                      />
                      <textarea
                        name="description"
                        placeholder="description"
                        defaultValue={project.description}
                      />
                      <button type="submit" disabled>
                        Submit Changes
                      </button>
                    </form>
                    <h2>Roles</h2>
                    {project.roles.map(({ name, slots, id: role_id }) => (
                      <div key={name}>
                        <div>{name}</div>
                        {slots.map(slot => {
                          if (slot.user_name) {
                            return (
                              <div key={slot.id}>
                                {slot.user_name}
                                <button
                                  onClick={() =>
                                    props.removeUserFromSlot(
                                      classroom_id,
                                      slot.id
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          } else {
                            return <div key={slot.id}>Empty</div>;
                          }
                        })}
                        <button
                          onClick={() =>
                            props.createSlot(classroom_id, project.id, {
                              role_id
                            })
                          }
                        >
                          Add Slot
                        </button>
                      </div>
                    ))}
                    <button disabled>Add Role</button>
                  </div>
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

const mapStateToProps = ({ classroom }) => {
  return classroom;
};

export default connect(
  mapStateToProps,
  {
    getClassroom,
    addProject,
    editClassroom,
    removeUserFromSlot,
    createSlot
  }
)(Classroom);

const StyledDiv = styled.div`
  border: solid 1px red;
`;

const StyledDiv2 = styled.div`
  border: solid 1px black;
`;

const StyledDiv3 = styled.div`
  border: solid 1px white;
`;

const StyledH1 = styled.h1`
  color: #ffffff;
  display: flex;
  justify-content: center;
  font-weight: 100;
`;

const StyledButton = styled.button`
  background: linear-gradient(
    15deg,
    rgba(213, 212, 208, 1) 0%,
    rgba(238, 238, 236, 1) 57%,
    rgba(233, 233, 231, 1) 100%
  );
  border: none;
  width: 200px;
  color: black;
  margin: 10px;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 1rem;
  border: solid 1px #48484841;
  border-radius: 4px;
  font-weight: 100;
  outline: none;
`;
