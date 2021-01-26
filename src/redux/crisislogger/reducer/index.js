import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory';
import userReducer from './user.reducer'
import updateReducer from './update.reducer'
import fileReducer from './file.reducer'
import dataReducer from './data.reducer' 
import questionnaryReducer from './questionnare.reducer'
import adminReducer from './admin.reducer';
export const history = createHistory();

export default combineReducers({
    router: connectRouter(history),
    user: userReducer,
    file: fileReducer,
    recordData: dataReducer,
    updateReducer: updateReducer,
    questionnary: questionnaryReducer,
    adminData:adminReducer
})