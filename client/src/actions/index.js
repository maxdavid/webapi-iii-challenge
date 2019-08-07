import { axiosRequest } from '../helpers';

export const getUsers = dispatch => {
  axiosRequest
    .get(`/users`)
    .then(res => {
      dispatch({ type: 'SET_USERS', payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUser = (dispatch, userId) => {
  axiosRequest
    .get(`/users/${userId}`)
    .then(res => {
      dispatch({ type: 'SET_CURRENT_USER', payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserPosts = (dispatch, userId) => {
  axiosRequest
    .get(`/users/${userId}/posts`)
    .then(res => {
      dispatch({ type: 'SET_USER_POSTS', payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
