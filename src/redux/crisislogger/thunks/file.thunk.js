import {
    fileUpload,
    fileUploadSuccess,
    fileUploadError,
    textUpload,
    textUploadSuccess,
    textUploadError
} from '../action/file.action'
import config from '../../../config'
import Utils from "../../../util/Utils";
export const uploadText = (data) => dispatch => {
    dispatch(textUpload())
    let formdata = new FormData()
    let token  = localStorage.getItem('token')
    formdata.append('text', data.text)
    formdata.append('contribute_to_science',data.contribute_to_science)
    formdata.append('publicly', data.publicly)
    formdata.append('country', data.country)
    formdata.append('checkAge', data.checkAge)
    formdata.append('where_from', new Utils().getCurrentDomain())
    fetch(config.crisisloggerAPIHost+'/file/text', {
        method: "POST",
        headers: {
            'Authorization' : 'Bearer ' + token
        },
        body: formdata
    })
        .then(res => res.json())
        .then(res => {
            if (res.upload_id !== undefined)
            {
                localStorage.setItem('upload_id', res.upload_id)
                dispatch(textUploadSuccess(res))
            }
            else {
                dispatch(textUploadError('Something went wrong, please try again later'))
            }
            
        })
        .catch(err => dispatch(textUploadError(err)))
}

export const fileUploadThunk = (file, formData) => dispatch => {
    dispatch(fileUpload())
    let data = new FormData()
    let token  = localStorage.getItem('token')
    data.append('file', file, new Date().toISOString())
    data.append('contribute_to_science',formData.contribute_to_science)
    data.append('publicly', formData.publicly)
    data.append('country', formData.country)
    data.append('checkAge', formData.checkAge)
    data.append('where_from', new Utils().getCurrentDomain())
    fetch(config.crisisloggerAPIHost+'/file/upload', {
        method: "POST",
        headers: {
            'Authorization' : 'Bearer ' + token
        },
        body: data
    })
        .then(res => res.json())
        .then((data) => {
            if(data.upload_id)
            {
                localStorage.setItem('upload_id', data.upload_id)
                dispatch(fileUploadSuccess())
            }
            else {
                dispatch(fileUploadError('Something went wrong,please try again'))
            }
        })
        .catch(err => console.log(err))
}