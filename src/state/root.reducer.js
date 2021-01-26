import { combineReducers } from 'redux';
import app from './app/app.reducer';
import user from './user/user.reducer';

export default combineReducers({
  app,
  user,
});
