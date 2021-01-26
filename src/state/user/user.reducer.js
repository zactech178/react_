import USER_CONSTANTS from './user.constants';

export const initialState = {
  user: null,
  auth: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_CONSTANTS.CLEAR:
      return initialState;
    case USER_CONSTANTS.SET_USER:
        return {
          ...state,
          user: action.payload
        }
    case USER_CONSTANTS.SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case USER_CONSTANTS.SET_APPLETS:
      return {
        ...state,
        applets: action.payload,
      }
    default:
      return state;
  }
};
