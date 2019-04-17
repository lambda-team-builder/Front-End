import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getClassrooms } from '../../services/classrooms/actions.js';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const Home = ({classroomsArr, gettingClassrooms, classroomsError, getClassrooms, ...props}) => {
  useEffect(() => {
    getClassrooms();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <div>
        {/* TODO: classrooms member of, searchable all classrooms, createClassrooms  */}
        <h2>Classrooms</h2>
        <Error error={classroomsError} />
        <div className={gettingClassrooms ? "loading" : ""}>
          {classroomsArr.map(cr => (
            <div key={cr.id}>
              <Link to={`/c/${cr.id}/${slugify(cr.name)}`}>
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

export default connect(mapStateToProps, { getClassrooms })(Home);
