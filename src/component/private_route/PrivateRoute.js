/**
 * Created by frank on 15/08/2017.
 */
import React from 'react';

import {
    Route,
    Redirect
} from 'react-router-dom';
import {AuthService} from '../../service/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        AuthService.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

export default PrivateRoute