import {
    CHANGE_INPUT,
    CHANGE_INPUT_MULTISELECT,
    SUBMIT_QUESTONNARY_DATA,
    SUBMIT_QUESTONNARY_DATA_SUCCESS,
    SUBMIT_QUESTONNARY_DATA_ERROR
} from '../actionType'

export const changeInput = (sectionName, inputName, value ) => ({
    type: CHANGE_INPUT,
    payload: {
        sectionName,
        inputName,
        value
    }
})

export const changeInputMultiselect = (sectionName, inputName, name) =>console.log(sectionName, '========>', inputName, '============>', name, '+++========') || ({
    type: CHANGE_INPUT_MULTISELECT,
    payload: {
        sectionName,
        inputName,
        name,
    }
})

export const sumbitQuestionnaryData = () => ({
    type: SUBMIT_QUESTONNARY_DATA
})

export const sumbitQuestionnaryDataSuccess = () => ({
    type: SUBMIT_QUESTONNARY_DATA_SUCCESS
})

export const sumbitQuestionnaryDataError = () => ({
    type: SUBMIT_QUESTONNARY_DATA_ERROR
})