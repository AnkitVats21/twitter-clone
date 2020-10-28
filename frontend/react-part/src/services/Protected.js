import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const Protected = ({ component: Cmp, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('refresh_token') ? (
                <Cmp {...props} />
            ) :
                <Redirect
                    to={{ pathname: "/sign-in", state: { from: props.location } }}

                />
        }
    />


)


export default Protected;