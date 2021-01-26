import { 
    GET_ALL_DATA,
    GET_ALL_DATA_FAILED, 
    GET_ALL_DATA_SUCCESS, 
    GET_RECORD_BY_ID, 
    GET_RECORD_BY_ID_FAILED, 
    GET_RECORD_BY_ID_SUCCESS, 
    UPDATE_APPROVE, 
    UPDATE_APPROVE_FAILED, 
    UPDATE_APPROVE_SUCCESS, 
    UPDATE_PUBLISHED, 
    UPDATE_PUBLISHED_FAILED, 
    UPDATE_PUBLISHED_SUCCESS } from "../actionType"

export const updateApprove = () => ({
    type: UPDATE_APPROVE
})

export const updateApprove_success = (payload) => ({
    type: UPDATE_APPROVE_SUCCESS,
    payload
})

export const updateApprove_error = (payload) => ({
    type: UPDATE_APPROVE_FAILED,
    payload
}) 

export const updatePublish = ()=>({
    type:UPDATE_PUBLISHED
})
export const updatePublish_success = (payload) =>({
    type:UPDATE_PUBLISHED_SUCCESS,
    payload
})
export const updatePublish_faield= (payload)=>({
    type:UPDATE_PUBLISHED_FAILED,
    payload
})
export const getAllData = () => ({
    type: GET_ALL_DATA
})

export const getAllData_success = (payload) =>({
    type:GET_ALL_DATA_SUCCESS,
    payload
})

export const getAllData_error = (payload)=>({
    type:GET_ALL_DATA_FAILED,
    payload
})
export const getDataById = ()=>({
    type:GET_RECORD_BY_ID
})
export const getDataById_success = (payload)=>({
    type:GET_RECORD_BY_ID_SUCCESS,
    payload
})
export const getDataById_error = (payload)=>({
    type:GET_RECORD_BY_ID_FAILED,
    payload
})