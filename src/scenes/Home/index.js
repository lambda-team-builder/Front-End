import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getClassrooms, createClassroom } from '../../services/classrooms/actions.js';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import Modal from '../../components/Modal';

const classroomUrl = (id, name) => `/c/${id}/${slugify(name)}`;

const Home = (props) => {
  // Initial data fetch
  useEffect(() => {
    props.getClassrooms();
  }, []);
  // Create classroom and navigate when state is update
  const handleCreateClassroom = event => {
    event.preventDefault();
    props.createClassroom({name: event.target.name.value});
  };
  useEffect(() => {
    props.createdClassroom && props.createdClassroom.name && props.createdClassroom.id
      && props.history.push(classroomUrl(props.createdClassroom.id, props.createdClassroom.name));
  }, [props.createdClassroom]);
  // modal state
  const [modalTarget, setModalTarget] = useState(null);
  const closeModal = () => setModalTarget(null);
  return (
    <div>
      <h1>Home</h1>
      <div>
        <button onClick={() => setModalTarget("createClassroom")}>Create Classroom</button>
        
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
      {modalTarget &&
       <Modal handleClose={closeModal}>
         {(() => {
           switch (modalTarget) {
           case "createClassroom":
             return (
               <form onSubmit={handleCreateClassroom}>
                 <input type="text" name="name" placeholder="name"/>
                 <button type="submit">Create Classroom</button>
               </form>);
           default:
             return null;
           }
         })()}
       </Modal>}
    </div>
  );
};

const mapStateToProps = ({classrooms}) => {
  return classrooms;
};

export default connect(mapStateToProps, { getClassrooms, createClassroom })(Home);
