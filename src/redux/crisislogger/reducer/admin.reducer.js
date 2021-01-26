import {
    GET_ALL_DATA, GET_ALL_DATA_SUCCESS,GET_ALL_DATA_FAILED, GET_RECORD_BY_ID, GET_RECORD_BY_ID_SUCCESS, GET_RECORD_BY_ID_FAILED, UPDATE_APPROVE, UPDATE_APPROVE_SUCCESS, UPDATE_APPROVE_FAILED, UPDATE_PUBLISHED, UPDATE_PUBLISHED_SUCCESS, UPDATE_PUBLISHED_FAILED
} from '../actionType'

const initialState = {
    loading: false,
    loaded: false,
    error: '',
    data: [],
    skip: 1,
    limit: 1,
    singleRecord:null,
    filter:null
}

export default (state = initialState, { type, payload }) => {
    switch(type){
        case GET_ALL_DATA:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case GET_ALL_DATA_SUCCESS:    
            return {
                ...state,
                loading: false,
                loaded: true,
                data: payload.records,
                filter:payload.filter
            }
        case GET_ALL_DATA_FAILED:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: payload
            }
        case GET_RECORD_BY_ID:
            return{
                ...state,
                loading: true,
                loaded: false,
            }
        case GET_RECORD_BY_ID_SUCCESS:
            return{
                ...state,
                loading: false,
                loaded: true,
                singleRecord: payload
            }
        case GET_RECORD_BY_ID_FAILED:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: payload,
            }
        case UPDATE_APPROVE:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case UPDATE_APPROVE_SUCCESS:
            return{
                ...state,
                loading: true,
                loaded: false,
            }
        case UPDATE_APPROVE_FAILED:{
            return{
                ...state,
                loading: false,
                loaded: true,
                error: payload,
            }
        }
        case UPDATE_PUBLISHED:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case UPDATE_PUBLISHED_SUCCESS:
            return{
                ...state,
                loading: true,
                loaded: false,
            }
        case UPDATE_PUBLISHED_FAILED:
            return{
                ...state,
                loading: false,
                loaded: true,
                error: payload,
            }
        default: 
            return {
                ...state
            }
    }
}