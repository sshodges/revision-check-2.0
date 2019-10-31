import { combineReducers } from 'redux';
import documentReducer from './documentReducers';
import authReducer from './authReducer';

export default combineReducers({
  document: documentReducer,
  auth: authReducer
});
