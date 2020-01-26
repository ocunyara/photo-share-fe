import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING_UI,
} from '../types'
import axios from 'axios'

// Get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      })
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      })
    })
}

// List a screams

export const likeScream = screamId => dispatch => {
  axios
    .get(`scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      })
    })
    // eslint-disable-next-line no-undef,no-console
    .catch(err => console.log(err))
}

// Unlike a screams

export const unlikeScream = screamId => dispatch => {
  axios
    .get(`scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      })
    })
    // eslint-disable-next-line no-undef,no-console
    .catch(err => console.log(err))
}

// Delete scream

export const deleteScream = screamId => dispatch => {
  axios
    .delete(`scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      })
    })
    // eslint-disable-next-line no-undef,no-console
    .catch(err => console.log(err))
}

// Post scream

export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post(`/scream`, newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      })
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err))
}
