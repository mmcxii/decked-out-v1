import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, user, setUser, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component user={user} setUser={setUser} {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
