import { GET_ALL_ITEMS, SET_LOADING, LOGS_ERROR } from './types';
import axios from 'axios';

// Get techs
export const getAllDocuments = () => async dispatch => {
  try {
    setLoading();
    let config = {
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDEvSTF4WGZRclNNRnRiaUxIYnRFOHhPa1luQ0VTcEZsNW1kcWlDbk5PV1VLSjZsUjJwWll2WHRDMXltcHNmL0o5Zkx3MGlXOWJoVzRnPT0iLCJpYXQiOjE1NzE4OTcxNjgsImV4cCI6MTU3MTk4MzU2OH0.41NR5YttHe04AtZxRo3F8_DfFHo9VGIRYsJ0YXw-x44'
      }
    };

    const res = await axios.get(
      'http://localhost:5000/api/documents/getall/items',
      config
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
