import APP_ACTIONS from './app.constants';

export const setCurrentApplet = appletId => ({
  type: APP_ACTIONS.SET_CURRENT_APPLET,
  payload: appletId,
});

export const setCurrentActivity = activityId => ({
  type: APP_ACTIONS.SET_CURRENT_ACTIVITY,
  payload: activityId,
});
