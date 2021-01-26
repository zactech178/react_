import React from 'react'
import { Route as R, Redirect as RD } from 'react-router-dom'
const PrivateRoute = ({ component: Component,role, ...rest }) => (
    <R
        {...rest}
        render={props =>
            localStorage.getItem('token') && (role !== undefined?(localStorage.getItem('role')=== role):true)?
            (<Component {...props} />):
            (<RD to='/login' />)
        }
    />
)
    
    
export default PrivateRoute