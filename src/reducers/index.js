/**
 * Created by frank on 09/08/2017.
 */
import {combineReducers} from 'redux';
import menu_data from './menu_data';
import sys_menu from './menu_data_ready';
import auth from './login_reducer'

const portalApp = combineReducers({
    auth,
    menu_data,
    sys_menu
})

export default portalApp