import { combineReducers } from 'redux';
import documentReducer from './documentReducers';
// import seasonReducer from './seasonReducer';
// import matchReducer from './matchReducer';
// import userReducer from './userReducer';

export default combineReducers({
  document: documentReducer
  //   season: seasonReducer
  // match: matchReducer,
  // user: userReducer,
});
