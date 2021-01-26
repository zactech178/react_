import {
    GET_DATA,
    GET_DATA_FAILED,
    GET_DATA_SUCCESS,
    GET_GALLERY_DATA,
    GET_GALLERY_DATA_FAILED,
    GET_GALLERY_DATA_SUCCESS,
} from '../actionType'

export const getData = () => ({
    type: GET_DATA
})

export const getData_success = (payload) => ({
    type: GET_DATA_SUCCESS,
    payload
})

export const getData_error = (payload) => ({
    type: GET_DATA_FAILED,
    payload
})

export const getGalleryData = () => ({
    type: GET_GALLERY_DATA
})

export const getGalleryData_Success = (payload) => ({
    type: GET_GALLERY_DATA_SUCCESS,
    payload
})

export const getGalleryData_Error = (payload) => ({
    type: GET_GALLERY_DATA_FAILED,
    payload
}) 