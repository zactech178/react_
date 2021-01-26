import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './i18n';
import {Store} from './redux'
import App from './App';
import './index.css';
import './style/global.scss'
const routing = (
  // need to determine how to implement the both of store for ML and CL project
    <ReduxProvider store={Store.CLStore}>
        <App />
    </ReduxProvider>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
