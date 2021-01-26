import { CHANGE_INPUT, CHANGE_INPUT_MULTISELECT } from '../actionType';
import { multiSelectChecked } from '../../../util/multiselect'


const initialState = {
   
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case CHANGE_INPUT: 
            return {
                ...state,
                [payload.sectionName]: {
                    ...state[payload.sectionName],
                    [payload.inputName]: {
                        ...state[payload.inputName],
                        value: payload.value
                    } 
                }
            }
        case CHANGE_INPUT_MULTISELECT:
            return {
                ...state,
                [payload.sectionName]: {
                    ...state[payload.sectionName],
                    [payload.inputName]: {
                        // ...state[payload.sectionName][payload.inputName],
                        value: state[payload.sectionName][payload.inputName] ?  multiSelectChecked(state[payload.sectionName][payload.inputName].value, payload.name) : [payload.name]
                    } 
                }
            }
        default:
            return {
                ...state
            }
    }
}