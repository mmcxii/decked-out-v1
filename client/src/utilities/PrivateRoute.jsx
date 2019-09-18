import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, user, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component user={user} {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
