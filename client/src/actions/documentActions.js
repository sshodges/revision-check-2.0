import { GET_ALL_ITEMS, SET_LOADING, LOGS_ERROR } from './types';
import axios from 'axios';

export const getAllDocuments = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get(
      'http://localhost:5000/api/documents/getall/items'
    );

    const data = res.data;

    dispatch({
      type: GET_ALL_ITEMS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error
    });
  }
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
};
