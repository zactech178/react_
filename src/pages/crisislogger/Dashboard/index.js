import React from 'react'
// import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import WordCloudComponent from '../../../components/common/wordCloudComponent';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteIcon from '@material-ui/icons/Delete';
import { getRecordData, changeContributeShare, removeRecords } from '../../../redux/crisislogger/thunks/data.thunk'
import Utils from '../../../util/Utils'
import Swal from 'sweetalert2'
import config from '../../../config'
import "./style.scss"

const Dashboard = (props) => {
    const [dataLoading, setDataLoading] = React.useState(true)
    React.useEffect(() => {
        props.loadData()
        setDataLoading(true)
    }, [dataLoading]);
    const utils = new Utils();
    const { loading, error, data } = props
    const { uploads, texts } = data
    const bottomBtnStyle = {
        display: 'flex',
        textAlign: 'center',
        padding: '0px 5px'
    }
    const handleContributeShare = async (type, contentType,  e, id, index) => {
        let status = e.currentTarget.checked
        if(status)
        {
            Swal.fire({
                title: (contentType ==='contribute'? 'Are you sure you want to contribute this for science?': 'Are you sure you want to share this publicly?'),
                text: (contentType === 'contribute'?' If Yes, you are only giving permission for (1) your data to be stored by our team, and (2) to be contacted before its use in future research.':
                        'If Public, the Child Mind Institute and its partners may share your text or recording through their websites and social media channels. If Private, your story will not be publicly shared in any form.'),
                showCancelButton: true,
                confirmButtonText:  contentType === 'contribute' ? 'Contribute to science' : 'Public',
                cancelButtonText:  contentType === 'contribute' ? 'Do not contribute' : 'Private',
            })
            .then(async (result) => {
                if (result.value)
                {
                    const data = {
                        type: type,
                        contentType: contentType,
                        upload_id: id,
                        status: status * 2
                    }
                    await props.changeStatus(data)
                    setDataLoading(false)
                }
                else {
                    setDataLoading(false)
                }
            })
        }
        else {
            Swal.fire({
                title: (contentType ==='contribute'? 'Are you sure you do not want to contribute this for science? ': 'Are you sure you want to make this private?'),
                text: (contentType ==='contribute'? 'Contributing to science means that you are only giving permission for (1) your data to be stored by our team, and (2) to be contacted before its use in future research.':
                    'If Public, the Child Mind Institute and its partners may share your text or recording through their websites and social media channels. If Private, your story will not be publicly shared in any form.'),
                confirmButtonText:  contentType === 'contribute' ? 'Do not contribute' : 'Private',
                showCancelButton: true,
                cancelButtonText:  contentType === 'contribute' ? 'Contribute to science' : 'Public',
            })
            .then( async (result) => {
                if (result.value)
                {
                    const data = {
                        type: type,
                        contentType: contentType,
                        upload_id: id,
                        status: status * 2
                    }
                    await props.changeStatus(data)
                    setDataLoading(false)
                }
                else {
                    setDataLoading(false)
                }
            })
        }
        if(type ==='text')
        {
            if(contentType === 'contribute')
            {
                texts[index].contribute_to_science = status
            }
            else {
                texts[index].share = status
            }
        }
        else {
            if(contentType === 'contribute')
            {
                uploads[index].contribute_to_science = status
            }
            else {
                uploads[index].share = status
            }
        }
    }
    const handleDelete = async (type, id, index) => {
        Swal.fire({
            text: 'Are you sure you want to delete this?',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText:  'Cancel',
        })
        .then(async (result) => {
            if (result.value) {
                await props.removeUserRecords({type: type, upload_id: id})
                setDataLoading(false)
            }
            else {
                setDataLoading(false)
            }
        })
    }
    return (
        <div className={'user-dashboard-container'}>
            <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div>
                    {
                        loading && <Spinner animation="border" />
                    }
                </div>
            </div>
            {
                error ?
                    <Alert color="warning" variant={'danger'}>
                        {error}
                    </Alert>
                    : null
            }
            <h3 className="text-left">My Recordings</h3>
            <br></br>
            <Row>
                {uploads.length > 0 ?
                    uploads.map((value, index) => {
                        let isVideo = value.name.split(".")[1] === 'webm' || value.name.split(".")[1] === 'mkv' || value.name.split(".")[1] === 'mp4';
                        let videoExtension = value.name.split(".")[1];
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} xl={3} style={{ marginTop: 20, padding: '0 10px' }} key={index}>
                                <div style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)', }}>
                                    
                                    {
                                      (value.transcripts !== undefined && value.transcripts !== null) &&  value.transcripts.text !== undefined? 
                                        <WordCloudComponent text={value.transcripts.text} words={Utils.getWords(value.transcripts.text)} type={'uploads'} />
                                      : <h4 style={{textAlign: 'center'}}>{value.share && value.contribute_to_science ? 'Video conversion in progress': 'No transcription'}</h4>
                                    }
                                    <div style={{ flexGrow: 1 }} />
                                    {isVideo ?
                                        value.name !== 'null'  && <ReactPlayer
                                            width={'100%'}
                                            height={205}
                                            style={{ margin: 0 }}
                                            controls={true}
                                            muted={false}
                                            url={[
                                                { src: config.googleBucketURL + value.name, type: 'video/' + videoExtension },
                                            ]}
                                        />
                                        :
                                        value.name !== 'null'  && <div>
                                            <ReactPlayer height={50} width={'100%'} url={config.googleBucketURL + value.name} controls={true} />
                                        </div>
                                    }
                                    <div style={{ flex: 1, marginTop: 10, textAlign: 'center' }}>
                                        <p>{utils.getDate(value.created_at)}</p>
                                    </div>
                                    <div style={bottomBtnStyle}>
                                        <Form.Check
                                            style={{ flex: 1 }}
                                            checked={value.contribute_to_science > 0}
                                            name="contribute"
                                            label="Contribute"
                                            onChange={(e) => handleContributeShare('upload', 'contribute', e, value._id, index)}
                                            id="check-contribute"
                                        />
                                        <Form.Check
                                            style={{ flex: 1 }}
                                            checked={value.share > 0}
                                            name="share"
                                            label="Share"
                                            onChange={(e) => handleContributeShare('upload', 'share', e, value._id, index)}
                                            id="check-share"
                                        />
                                         <span style={{cursor: 'pointer'}} onClick={() => handleDelete('upload', value._id, index)} >
                                            <DeleteIcon style={{fontSize: 18}} /> Delete
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                    :
                    <Alert color="warning" variant={'warning'} style={{ margin: '0 auto' }}>
                        {'No records are found'}
                    </Alert>
                }
            </Row>
            <br></br>
            <h3 className="text-left">Texts</h3>
            <br></br>
            <Row>
                {
                    texts.length > 0 ?
                        texts.map((value, index) => {
                            return (
                                <Col xs={12} sm={6} md={4} lg={3} xl={3} style={{ marginTop: 20, padding: '0 10px'}} key={index}>
                                    <div style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)', }}>
                                        <WordCloudComponent text={value.text} words={[]} type={'text'} />
                                    </div>
                                    <div style={{ flex: 1, marginTop: 10, textAlign: 'center' }}>
                                        <p>{utils.getDate(value.created_at)}</p>
                                    </div>
                                    <div style={bottomBtnStyle}>
                                        <Form.Check
                                            style={{ flex: 1 }}
                                            checked={value.contribute_to_science > 0}
                                            name="contribute"
                                            label="Contribute"
                                            onChange={(e) => handleContributeShare('text','contribute', e, value._id, index)}
                                            id="check-contribute"
                                        />
                                        <Form.Check
                                            style={{ flex: 1 }}
                                            checked={value.share > 0}
                                            name="share"
                                            label="Share"
                                            onChange={(e) => handleContributeShare('text', 'share' ,e, value._id, index)}
                                            id="check-share"
                                        />
                                        <span>
                                            <DeleteIcon onClick={() => handleDelete('text', value._id, index)} />
                                        </span>
                                    </div>
                                </Col>
                            )
                        })
                        :
                        <Alert color="warning" variant={'warning'} style={{ margin: '0 auto' }}>
                            {'No texts are found'}
                        </Alert>
                }
            </Row>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    loadData: bindActionCreators(getRecordData, dispatch),
    changeStatus: bindActionCreators(changeContributeShare, dispatch),
    removeUserRecords: bindActionCreators(removeRecords, dispatch)
})
const mapStateToProps = state => {
    return {
        data: state.recordData.data,
        loading: state.recordData.loading,
        loaded: state.recordData.loaded,
        error: state.recordData.error
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)