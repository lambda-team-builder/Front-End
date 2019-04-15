import { combineReducers } from 'redux';
import { sessionReducer } from './session/reducer.js';

export const rootReducer = combineReducers({
  sessionReducer,
});
