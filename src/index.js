import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
//import App from './App';
import App from './App';
import portalApp from './reducers/index';
//import { menuDataReady,menuListRefreshed } from './action/index';
import registerServiceWorker from './registerServiceWorker';
//import {Get} from './service/HttpService';

import { areadyLoginAction } from './action/index';
let store = createStore(portalApp)



let current_user_token=sessionStorage.getItem('current_user_token');
//console.log(JSON.stringify(current_user));
if(current_user_token!==undefined&&current_user_token!==null&&current_user_token!=='null'){
    store.dispatch(areadyLoginAction());
}


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
