import { GET_ALL_ITEMS, SET_LOADING, LOGS_ERROR } from './types';
import axios from 'axios';

// Get techs
export const getAllDocuments = () => async dispatch => {
  try {
    setLoading();
    let config = {
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDErNkdNTTVLLzlOSERrZkZySy9DV3dBQ3BoZ3JmemZaTnBMWDVDckpaeHh6Ymh1Z3l1dFY0YTYrTzhOYm9qVlA2alFtNDU2cTQrbVhRPT0iLCJpYXQiOjE1NzE3MjA4MzksImV4cCI6MTU3MTgwNzIzOX0.wJCt0xauc-J6VWuminj8kaAadmH8Uz_G_76kEvWfOCg'
      }
    };

    const res = await axios.get(
      'http://localhost:5000/api/documents/getAll',
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
