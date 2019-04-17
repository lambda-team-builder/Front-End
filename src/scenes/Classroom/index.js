import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getClassroom, addProject } from '../../services/classroom/actions.js';

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
  return (
    <div>
      <h1>{props.name}</h1>
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
    </div>
  );
};

const mapStateToProps = ({classroom}) => {
  const { name, projects, gettingClassroom, classroomError } = classroom;
  return { name, projects, gettingClassroom, classroomError };
};

export default connect(mapStateToProps, { getClassroom, addProject })(Classroom);
