import {
    UPDATE_DATA,
    UPDATE_DATA_FAILED,
    UPDATE_DATA_SUCCESS,
} from '../actionType'

const initialState = {
    loading: false,
    loaded: false,
    success: false,
    error: '',
    result: ''
}

export default (state = initialState, { type, payload }) => {
    switch(type){
        case UPDATE_DATA:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case UPDATE_DATA_SUCCESS:    
            return {
                ...state,
                loading: false,
                loaded: true,
                success: true,
                result: payload
            }
        case UPDATE_DATA_FAILED:
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