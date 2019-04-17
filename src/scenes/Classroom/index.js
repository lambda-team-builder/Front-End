import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getClassroom } from '../../services/classroom/actions.js';

const Classroom = (props) => {
  useEffect(() => {
    console.log("here");
    props.getClassroom(props.match.params.classroom_id);
  }, [props.match.params.classroom_id]);
  return (
    <div>
      <h1>{props.name}</h1>
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

export default connect(mapStateToProps, { getClassroom })(Classroom);
