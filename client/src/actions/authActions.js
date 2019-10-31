import { LOAD_USER, AUTH_ERROR, SET_LOADING } from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/auth');

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
};
