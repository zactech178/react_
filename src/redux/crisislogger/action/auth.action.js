import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
} from '../actionType'

export const login = () => ({
    type: LOGIN
})

export const login_success = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const login_error = (payload) => ({
    type: LOGIN_ERROR,
    payload
}) 

export const register = () => ({
    type: REGISTER
})

export const register_success = (payload) => ({
    type: REGISTER_SUCCESS,
    payload
})

export const register_error = (payload) => ({
    type: REGISTER_ERROR,
    payload
})