import React from "react";
import {Row, Button, Alert, Spinner} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import UploadQuestionnaire from './uploadQuestionnaire'
import micro from '../../../assets/mic-24px.svg'
import video from '../../../assets/videocam-24px.svg'
import stopIcon from '../../../assets/stop.svg'
import Utils from '../../../util/Utils'
import './style.scss'


let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let recorder, audioInput, gumStream, timeoutRequest;
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof window.safari !== 'undefined' && window.safari.pushNotification));
const Record = ({type, onFinished, loading, onStartRecording}) => {

    let videoConstraints = {
        audio: true,
        video: {
            width: {min: '100%', ideal: 320},
            height: {min: 240, ideal: 240},
        }
    }
    let audioConstraints = {
        audio: true,
        video: false
    };
    const blobType = 'video/webm'
    const [preview, setPreview] = React.useState(null)
    const [mediaStream, setMediaStream] = React.useState(undefined);
    const [chunks, setChunks] = React.useState([]);
    const [recordStarted, setRecordStated] = React.useState(false)
    const [askingPermission, setAskingPermission] = React.useState(false)
    const [formState, setFormState] = React.useState({
        contribute_to_science: true,
        publicly: null,
        country: '',
        checkAge: false,
        where_from: new Utils().getCurrentDomain(),
        errors: {}
    })
    const onClose = () => {
        setShowModal(false)
    }
    const handleDataAvailable = ({data}) => {
        const newChunks = [...chunks, data];
        setChunks(newChunks);
    }
    const handleStop = () => {
        const blob = new Blob(chunks, {blobType});
        let url = URL.createObjectURL(blob)
        setRecordFile(blob)
        setRecordFileURL(url)
        setShowModal(true)
    }

    const [permissionGranted, setPermissionGranted] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)
    const [secondModal, setShowSecondModal] = React.useState(false)
    const [recordFile, setRecordFile] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [recordFileURL, setRecordFileURL] = React.useState(null)

    const startRecording = () => {
        onStartRecording(type)
        if (navigator.vibrate) navigator.vibrate(150);
        try {
            if (type === 'video') {
                recorder = new MediaRecorder(mediaStream, {
                    mimeType: blobType,
                    ondataavailable: handleDataAvailable,
                    onstop: handleStop
                });
                recorder.start()
            } else {
                if (audioContext.state === 'suspended') {
                    audioContext.resume().then(function () {
                        startRecording();
                    });
                    return true;
                }
                recorder = new window.Recorder(audioInput, {
                    numChannels: 1,
                    onAnalysed: data => console.log(data),
                })
                navigator.mediaDevices.getUserMedia(audioConstraints).then(function (stream) {
                    /* assign to gumStream for later use */
                    gumStream = stream;
                    /* use the stream */
                    audioInput = audioContext.createMediaStreamSource(stream);
                    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */

                    //start the recording process 
                    recorder.record()
                    if (navigator.vibrate) navigator.vibrate(150);
                }).catch(function (err) {
                    setRecordStated(false)
                    setError('Recording failed, please try again later.')
                });
            }
            //limit recording to 5 mins = 300,000 ms
            timeoutRequest = setTimeout(function () {
                stopRecording();
            }, 300000);
            setRecordStated(true)
        } catch (e) {
            setRecordStated(false)
            setError('Recording failed, please try again later.')
        }

    }
    const askPermission = () => {
        setAskingPermission(true)
        try {
            navigator.mediaDevices.getUserMedia(type === 'video' ?
                videoConstraints : audioConstraints).then(stm => {
                setMediaStream(stm)
                if (type === 'video') {
                    preview.srcObject = stm;
                    preview.captureStream = preview.captureStream || preview.mozCaptureStream;
                } else {
                    audioInput = audioContext.createMediaStreamSource(stm);
                }
                setPermissionGranted(true)
                setAskingPermission(false)
            })
                .catch((e) => {
                    setPermissionGranted(false)
                    setAskingPermission(false)
                    setError('The Recording is not supported on this device')
                })
        } catch (e) {
            setPermissionGranted(false)
            setAskingPermission(false)
            setError('The Recording is not supported on this device')
        }
    }

    const stopRecording = () => {
        const chunks = []
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        if (type === 'video') {
            recorder.ondataavailable = e => {
                chunks.push(e.data);
                preview.src = URL.createObjectURL(e.data);
                let blob = new Blob(chunks, {type: blobType});
                let url = URL.createObjectURL(blob)
                setRecordFile(blob)
                setRecordFileURL(url)
                setShowModal(true)
            }
            recorder.stop();
        } else {
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
            //create the wav blob and pass it on to createDownloadLink 
            recorder.exportWAV(createDownloadLink);
        }
        clearTimeout(timeoutRequest)
        setRecordStated(false)
    }
    const createDownloadLink = (blob) => {
        let url = URL.createObjectURL(blob);
        setRecordFile(blob)
        setRecordFileURL(url)
        setShowModal(true)
        //add controls to the <audio> element 
    }
    const deleteRecord = () => {
        setRecordFile(null)
        setRecordFileURL(null)
        setShowModal(false)
        setShowSecondModal(false)
    }

    const showSecondPageModal = () => {
        setShowModal(false)
        setShowSecondModal(true)
    }
    const onSecondModalClose = () => {
        setShowSecondModal(false)
    }
    const uploadRecord = () => {
        // setShowSecondModal(false)
        let formItem = formState;
        let errors = []
        if (formItem.publicly == null) {
            errors['publicly'] = "You need to click above checkbox before continue"

        }
        if (formItem.checkAge === false) {
            errors['checkAge'] = "You need to click above checkbox before continue"
        }
        if (errors['checkAge'] || errors['publicly']) {
            setFormState({...formState, errors: errors})
            return false;
        } else {
            setFormState({...formState, errors: []})
        }
        onFinished({file: recordFile, formState: formState})
    }
    const space = {
        marginTop: 15,
        textAlign: 'center',
    }
    return (
        <div>
            {error &&
            <Alert variant={'danger'} dismissible={true} onClose={() => setError(null)}>{error}</Alert>}
            <Row>
                {
                    type === 'video' ?
                        <div style={{width: 480, margin: '0 auto'}}>
                            {
                                isSafari?
                                    <p style={{color:'red'}}>{'The Safari browser allows you to type text and record audio, but not video.\n' +
                                    'cIf you want to record video, please use a different browser like Chrome or Firefox.'}
                                    </p>
                                    : null
                            }
                            <video
                                ref={el => setPreview(el)}
                                style={{width: 270, height: 200}}
                                muted
                                autoPlay={true}
                            >
                            </video>
                            <br></br>
                            {askingPermission &&
                            <Spinner animation="border"/>
                            }
                        </div>
                        :
                        <div style={{width: 270, height: 200}}>
                            <audio
                                ref={el => setPreview(el)}
                            >
                            </audio>
                            <br></br>
                            {askingPermission &&
                            <Spinner animation="border"/>
                            }
                        </div>
                }

            </Row>
            <div style={{margin: '0 auto'}}>
                {
                    !permissionGranted ?
                        <Button variant={'primary'} disabled={type ==='video' &&  isSafari} onClick={() => askPermission()}>Request
                            a {type === 'video' ? 'camera' : 'microphone'}</Button>
                        :
                        <Row style={space}>
                            {
                                !recordStarted ?
                                    <div className={'video-camera-btn'}>
                                        <div className={'camera-icon-block'} onClick={startRecording}>
                                            <img alt={'record'} src={type === 'video' ? video : micro}/>
                                        </div>
                                    </div>
                                    :
                                    <div className={'video-camera-stop-btn'}>
                                        <div className={'camera-recording-block'} onClick={stopRecording}>
                                            <img alt={'stop'} src={stopIcon}/>
                                        </div>
                                    </div>
                            }
                        </Row>
                }
            </div>
            <CustomModal
                visible={showModal}
                header="Upload File"
                onClose={onClose}
                body={
                    type === 'video' ?
                        <video style={{width: '100%'}} controls={true} src={recordFileURL}/>
                        : <audio style={{width: '100%'}} controls={true} src={recordFileURL}/>
                }
                buttons={
                    [
                        <Button variant={'danger'} onClick={() => deleteRecord()}>Delete Recording</Button>,
                        <Button variant={'success'} onClick={() => showSecondPageModal()}>Upload Recording</Button>
                    ]
                }
            />
            <CustomModal
                visible={secondModal}
                onClose={onSecondModalClose}
                body={<UploadQuestionnaire setFormState={setFormState} formState={formState}/>}
                header="Upload File"
                buttons={
                    [
                        <Button variant={'secondary'} onClick={() => deleteRecord()}>Cancel</Button>,
                        <Button variant={'primary'} onClick={() => uploadRecord()} disabled={loading}>
                            {loading ? <Spinner animation="border"/> : ''}Continue</Button>
                    ]
                }
            />
        </div>
    )
}

const CustomModal = ({visible, body, header, buttons, onClose}) => {
    return (
        <Modal show={visible} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {buttons && buttons.map((button, index) => {
                    return (
                        <div key={index}>
                            {button}
                        </div>
                    )
                })
                }
            </Modal.Footer>
        </Modal>
    )
}
export default Record