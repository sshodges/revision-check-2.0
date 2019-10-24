import { GET_ALL_ITEMS, SET_LOADING, LOGS_ERROR } from '../actions/types';

const initialState = {
  allDocuments: null,
  loading: false,
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_ALL_ITEMS:
      return {
        ...state,
        allDocuments: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
