import * as R from 'ramda';

export const authSelector = R.path(['user', 'auth']);

export const authTokenSelector = R.path(['user', 'auth']);

export const userSelector = R.path(['user', 'user']);

export const loggedInSelector = R.pathOr(false, ['user', 'auth', 'token']);

export const appletSelector = R.path(['user', 'applets']);
