import { 
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../actionType'

const initialState = {
    user: {},
    loading: false,
    loaded: false,
    error: ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN: 
            return {
                ...state,
                loading: true,
                loaded: false,
                error: '',
            }
        case LOGIN_SUCCESS: 
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.payload,
          
            }
        case LOGIN_ERROR: 
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
                
            }
        case REGISTER: 
            return {
                ...state,
                loading: true,
                loaded: false,
                error: '',
            }
        case REGISTER_SUCCESS: 
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.payload,
            }
        case REGISTER_ERROR: 
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
            }
        default: return { ...state }
    }
}