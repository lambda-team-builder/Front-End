import { combineReducers } from 'redux';
import { sessionReducer } from './session/reducer.js';
import { classroomsReducer } from './classrooms/reducer.js';

export const rootReducer = combineReducers({
  session: sessionReducer,
  classrooms: classroomsReducer,
});
