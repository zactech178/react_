import * as R from 'ramda';
import {
  setInfo,
  setAuth,
} from './user.actions';

export const signInSuccessful = response => (dispatch) => {
  dispatch(setInfo(response.user));
  dispatch(setAuth(response.authToken));
};

export const signUpSuccessful = response => (dispatch) => {
  dispatch(setInfo(R.omit(['authToken'], response)));
  dispatch(setAuth(R.prop('authToken', response)));
};

export const updateUserDetailsSuccessful = response => (dispatch) => {
  dispatch(setInfo(response));
};
