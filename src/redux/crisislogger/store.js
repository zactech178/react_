import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';
import { history } from './reducer'

const middleware = routerMiddleware(history);

export const CLStore = createStore(reducer, composeWithDevTools(applyMiddleware(middleware, thunk)));