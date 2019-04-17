import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getClassrooms, createClassroom } from '../../services/classrooms/actions.js';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const classroomUrl = (id, name) => `/c/${id}/${slugify(name)}`;

const Home = (props) => {
  useEffect(() => {
    props.getClassrooms();
  }, []);
  const handleCreateClassroom = event => {
    event.preventDefault();
    props.createClassroom({name: event.target.name.value});
  };
  useEffect(() => {
    props.createdClassroom && props.createdClassroom.name && props.createdClassroom.id
      && props.history.push(classroomUrl(props.createdClassroom.id, props.createdClassroom.name));
  }, [props.createdClassroom]);
  console.log("render", props);
  return (
    <div>
      <h1>Home</h1>
      <div>
        <form onSubmit={handleCreateClassroom}>
          <input type="text" name="name" placeholder="name"/>
          <button type="submit">Create Classroom</button>
        </form>
        {/* TODO: classrooms member of, searchable all classrooms, createClassrooms  */}
        <h2>Classrooms</h2>
        <Error error={props.classroomsError} />
        <div className={props.gettingClassrooms ? "loading" : ""}>
          {props.classroomsArr.map(cr => (
            <div key={cr.id}>
              <Link to={classroomUrl(cr.id, cr.name)}>
                {cr.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({classrooms}) => {
  return classrooms;
};

export default connect(mapStateToProps, { getClassrooms, createClassroom })(Home);
