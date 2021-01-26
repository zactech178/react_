import {
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
    GET_DATA,
    GET_GALLERY_DATA,
    GET_GALLERY_DATA_SUCCESS,
    GET_GALLERY_DATA_FAILED,
} from '../actionType'

const initialState = {
    loading: false,
    loaded: false,
    error: '',
    data: {
        uploads: [],
        texts: []
    },
    galleries: [],
    skip: 1,
    limit: 1,
}

export default (state = initialState, { type, payload }) => {
    switch(type){
        case GET_DATA:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case GET_DATA_SUCCESS:    
            return {
                ...state,
                loading: false,
                loaded: true,
                data: payload
            }
        case GET_DATA_FAILED:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: payload
            }
        case GET_GALLERY_DATA:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case GET_GALLERY_DATA_SUCCESS:    
            return {
                ...state,
                loading: false,
                loaded: true,
                galleries: payload.data,
                skip: payload.skip + state.limit
            }
        case GET_GALLERY_DATA_FAILED:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: payload
            }
            
        default: 
            return {
                ...state
            }
    }
}