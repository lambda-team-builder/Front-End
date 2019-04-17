import { combineReducers } from 'redux';
import { sessionReducer } from './session/reducer.js';
import { classroomsReducer } from './classrooms/reducer.js';
import { classroomReducer } from './classroom/reducer.js';

export const rootReducer = combineReducers({
  session: sessionReducer,
  classrooms: classroomsReducer,
  classroom: classroomReducer,
});
