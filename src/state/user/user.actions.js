import USER_CONSTANTS from './user.constants';

export const setUser = user => ({
  type: USER_CONSTANTS.SET_USER,
  payload: user,
});

export const setAuth = auth => ({
  type: USER_CONSTANTS.SET_AUTH,
  payload: auth,
});

export const setApplets = applets => ({
  type: USER_CONSTANTS.SET_APPLETS,
  payload: applets,
});

export const clearUser = () => ({
  type: USER_CONSTANTS.CLEAR,
});
