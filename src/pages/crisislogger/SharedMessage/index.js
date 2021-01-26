import React, {useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {detect} from 'detect-browser'
import { fileUploadThunk, uploadText } from '../../../redux/crisislogger/thunks/file.thunk'
import Record from '../../../components/common/Record'
import CustomModal from '../../../components/crisislogger/CustomModal'
import Swal from 'sweetalert2'
import UploadQuestionnaire from '../../../components/common/Record/uploadQuestionnaire'
import Utils from '../../../util/Utils'
import "./style.scss"

const SharedMessage = (props) => {
    const { t } = useTranslation()
    const utils  = new Utils();
    const browser = detect();
    const [shareText, setShareText] = React.useState('')
    const [secondModal, setSecondModal] = React.useState(false)
    const [formState, setFormState] = React.useState({
        contribute_to_science: true,
        publicly: null,
        country: '',
        where_from:  utils.getCurrentDomain(),
        checkAge: false,
        errors: {},
    })
    const continueSubmit = () => {
        let formItem = formState;
        let errors = []
        if (formItem.publicly == null) {
            errors['publicly'] = "You need to click above checkbox before continue"

        }
        if (formItem.checkAge === false) {
            errors['checkAge'] = "You need to click above checkbox before continue"
        }
        if (errors['checkAge'] || errors['publicly']) {
            setFormState({ ...formState, errors: errors })
            return false;
        }
        else {
            setFormState({ ...formState, errors: [] })
        }
        props.uploadText({ text: shareText, ...formState })
    }
    const cancelSubmit = () => {
        setShareText('')
        setSecondModal(false)
    }
    const changeType = (type) => () => {
        localStorage.setItem('recordType', type)
    }
    const fileUpload = data => {
        props.uploadFile(data.file, data.formState)
    }

    const handleTextChange = (event) => {
        setShareText(event.target.value)
    }
    const closeTextModal = () => {
        setSecondModal(false)
    }
    const submitText = () => {
        changeType('text')
        setSecondModal(true)
    }
    useEffect( () => {
        if(props.success )
        {
            Swal.fire({
                title: "Success!",
                text: "File uploaded successfully.",
                type: "Success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then(({isConfirmed}) => {
                if(isConfirmed)
                {
                    let isLoggedin = localStorage.getItem('token')
                    if(isLoggedin)
                    {
                        props.history.push('/dashboard')
                    }
                    else {
                        props.history.push('/register')
                    }
                }
                else {
                    setSecondModal(false)
                }
            })
        }
        if(props.error)
        {
            Swal.fire({
                title: "",
                text: props.error,
                type: "Warning",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then(({isConfirmed}) => {
                setSecondModal(false)
            })
        }
    }, [props.error, props.success]);


    const setRecordingType  = (type) => {
        changeType(type);
    }
    let isSafari = browser.name === "safari"
    return (
        <div className="shared-message-container">
            <Row style={{ justifyContent: 'center', marginTop: '110px' }}>
                <div className="text-align-center">
                    <h1 className="grey-title">{t(utils.getsubDomain()+'.sharedMessage.title')}</h1>
                    <div className={'row'}>
                        <div className={'col-lg-4 col-md-4 col-sm-12 mt-5'}>
                            {isSafari?(
                              <div className={"safari-info"}>
                                  The Safari browser allows you to type text and record audio, but not video, please use a different browser like Chorme or Firefox
                              </div>
                            ):(
                              <Record type={'video'} onFinished={fileUpload} onStartRecording={setRecordingType} loading={props.loading} />
                            )}
                        </div>
                        <div className={'col-lg-4 col-md-4 col-sm-12 mt-5'}>
                            <Record type={'audio'} onFinished={fileUpload} onStartRecording={setRecordingType} loading={props.loading} />
                        </div>
                        <div className={'col-lg-4 col-md-4 col-sm-12 mt-5'}>
                            <Form.Control as="textarea" style={{height: '100%'}} row="10" cols={20} onChange={handleTextChange} placeholder={t(utils.getsubDomain()+'.sharedMessage.message')} />
                            {shareText.length > 1 && <Button style={{ marginTop: 10 }} onClick={submitText}>Submit</Button>}
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="grey-text" dangerouslySetInnerHTML={{ __html: t(utils.getsubDomain()+'.sharedMessage.text') }}></div>
                    </div>
                </div>
            </Row>
            <CustomModal
                visible={secondModal}
                onClose={closeTextModal}
                body={<UploadQuestionnaire setFormState={setFormState} formState={formState} type={'text'} />}
                header="Upload File"
                buttons={
                    [
                        <Button variant={'secondary'} onClick={cancelSubmit}>Cancel</Button>,
                        <Button variant={'primary'} onClick={continueSubmit} disabled={props.loading}>
                            {props.loading ? <Spinner animation="border" /> : ''}
                        Continue</Button>
                    ]
                }
            />
        </div>
    )
}

const mapstateToProps = (state) => {
    return {
        loading: state.file.loading,
        success: state.file.loaded,
        error: state.file.error,
    }
}
const mapDispatchToProps = (dispatch) => ({
    uploadFile: bindActionCreators(fileUploadThunk, dispatch),
    uploadText: bindActionCreators(uploadText, dispatch)
})

export default connect(mapstateToProps, mapDispatchToProps)(SharedMessage)