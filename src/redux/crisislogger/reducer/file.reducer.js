import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    TEXT_UPLOAD,
    TEXT_UPLOAD_SUCCESS,
    TEXT_UPLOAD_ERROR
} from '../actionType'

const initialState = {
    loading: false,
    loaded: false,
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch(type){
        case FILE_UPLOAD:
        case TEXT_UPLOAD:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case FILE_UPLOAD_SUCCESS: 
        case TEXT_UPLOAD_SUCCESS:    
            return {
                ...state,
                loading: false,
                loaded: true,
            }
        case FILE_UPLOAD_ERROR:
        case TEXT_UPLOAD_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: payload,
            }
        default: 
            return {
                ...state
            }
    }
}