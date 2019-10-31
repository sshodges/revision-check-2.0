import { LOAD_USER, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        error: action.payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        allDocuments: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
