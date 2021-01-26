 import config from '../../../config'
import Utils from '../../../util/Utils'
import {getDataById,getDataById_success,getDataById_error,getAllData,getAllData_error,getAllData_success,updateApprove, updateApprove_error, updateApprove_success, updatePublish, updatePublish_faield, updatePublish_success } from '../action/admin.action'
export const updateRecordApprove = (id) => dispatch => {
    dispatch(updateApprove())
    let token  = localStorage.getItem('token')
    fetch((config.crisisloggerAPIHost+'/users/changeApproveStatus/'+id), {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization' : 'Bearer ' + token
        },
    })
    .then(response => {
        Utils.forceLogout(response.status)
        return response.json()
    })
    .then((data) => {
        if(data.records !==undefined)
        {
            dispatch(updateApprove_success(data.data))
        }
        else {
            dispatch(updateApprove_error('Something went wrong, please try to refresh the page'))
        }
    })
    .catch(err => console.log(err))
}
export const updateRecordPublish = (id) => dispatch => {
    dispatch(updatePublish())
    let token  = localStorage.getItem('token')
    fetch((config.crisisloggerAPIHost+'/users/changePublishStatus/'+id), {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization' : 'Bearer ' + token
        },
    })
    .then(response => {
        Utils.forceLogout(response.status)
        return response.json()
    })
    .then((data) => {
        if(data.records !==undefined)
        {
            dispatch(updatePublish_success(data.data))
        }
        else {
            dispatch(updatePublish_faield('Something went wrong, please try to refresh the page'))
        }
    })
    .catch(err => console.log(err))
}
export const getRecordsById=(ids,type)=>dispatch=>{
    dispatch(getDataById)
    let token  = localStorage.getItem('token')
    let url = ""
    if(type === "media"){
        url = config.crisisloggerAPIHost+'/users/uploads?ids='+ids
    }else if(type === "text"){
        url = config.crisisloggerAPIHost+'/users/texts?ids='+ids
    }
    fetch((url), {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    })
    .then(response => {
        Utils.forceLogout(response.status)
        return response.json()
    })
    .then((data) => {
        if(data.data !==undefined)
        {
            dispatch(getDataById_success(data.data))
        }
        else {
            dispatch(getDataById_error('Something went wrong, please try to refresh the page'))
        }
    })
    .catch(err => console.log(err))
}
export const getAllUploads = (filter) => dispatch => {
    let token  = localStorage.getItem('token')
    fetch(config.crisisloggerAPIHost+'/users/getAllRecords?'+filter, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    })
    .then(response => {
        Utils.forceLogout(response.status)
        return response.json()
    })
    .then((data) => {
        if(data.records !==undefined)
        {
            dispatch(getAllData_success(data))
        }
        else {
            dispatch(getAllData_error('Something went wrong, please try to refresh the page'))
        }
    })
    .catch(err => console.log(err))
}
export const downloadCsv = (filter) => {
    let token  = localStorage.getItem('token')
    fetch(config.crisisloggerAPIHost+'/file/downloadCsv?'+filter, {
        method: "GET",
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then(response => {
        var link=document.createElement('a');
        const b = response.blob()
        b.then(bb=>{
            const url= window.URL.createObjectURL(bb);
            link.href=url;
            link.download="submission-reports.csv";
            link.click();
            window.URL.revokeObjectURL(url);
        })

    })
    .then((data) => {
    })
    .catch(err => console.log(err))
}

