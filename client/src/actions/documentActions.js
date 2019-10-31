import { GET_ALL_ITEMS, SET_LOADING, LOGS_ERROR } from './types';
import axios from 'axios';

// Get techs
export const getAllDocuments = () => async dispatch => {
  try {
    setLoading();
    let config = {
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDErKzViTENXaDlLdUgrYU1lS2xZWnVKcHpGZHExTU52UFZBSkx3UFl2VTI4UDMyYTF1YXE3U1daSlFCd2F4MWhnSTFQdGVUT1Rld01nPT0iLCJpYXQiOjE1NzI0ODU4MjAsImV4cCI6MTU3MjU3MjIyMH0.1iu0bdIbEdXh2eI_GZ467hh9XJ0LIiNKQZ2FagEawCI'
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
