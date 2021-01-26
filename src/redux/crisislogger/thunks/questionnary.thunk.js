import config from '../../../config'
import { 
    sumbitQuestionnaryData,
    sumbitQuestionnaryDataError
} from '../action/questionnary.action'


export const sumbitQuestionnaryDataThunk = (data) => dispatch => {
    dispatch(sumbitQuestionnaryData())

    let token  = localStorage.getItem('token')

    fetch(config.crisisloggerAPIHost+ '/users/questionnaire', {
        method: "POST",
        headers: {
            'Content-type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            questionnaryData: data
        })
    })
        .then(res => res.json())
        .then(res => {
            window.location.href = '/dashboard'
        })
        .catch(err => dispatch(sumbitQuestionnaryDataError()))
}