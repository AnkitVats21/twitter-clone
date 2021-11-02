import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const Protected = ({ component: Cmp, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('refreshToken') ? (
                <Cmp {...props} />
            ) :
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}

                />
        }
    />


)


export default Protected;