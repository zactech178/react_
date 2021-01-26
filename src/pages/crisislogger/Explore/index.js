import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Row,
    Col,
    Button,
    Alert,
    Spinner,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WordCloudComponent from "../../../components/common/wordCloudComponent";
import ReactPlayer from 'react-player'
import config from '../../../config'
import Utils from '../../../util/Utils'
import LeftImage from '../../../assets/left-arrow.png'
import RightImage from '../../../assets/next.png'
import { getGalleries } from '../../../redux/crisislogger/thunks/data.thunk'
import "./style.scss"

const Explore = (props) => {
    const { t } = useTranslation()
    const [dataLoading, setDataLoading] = React.useState(true)
    const [searchText, setSearchText] = React.useState('')
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(1);
    const utils = new Utils();
    React.useEffect(() => {
        props.loadData(skip, searchText)
        setDataLoading(true)
    }, [skip, limit, dataLoading]);
    const search = () => {
        setDataLoading(false)
    }
    const nextPage = () => {
        setSkip(skip + limit)
    }

    const previousPage = () => {
        setSkip(skip - limit)
    }
    const { loading, error, data } = props
    return (
        <div className={'user-dashboard-container'}>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, marginTop: 30 }}>
                <span style={{ color: '#6e6e6e', fontSize: 30, flex: 1 }} className={'mobile-show'}>
                    {t(utils.getsubDomain()+".explore.header")}
                </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, marginBottom: 30 }}>

                <span style={{ color: '#6e6e6e', fontSize: 14, flex: 1 }}>
                    --- {t(utils.getsubDomain()+".explore.description")} ---
                </span>
            </div>
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
            <br></br>
            <Col xs={12} md={6} lg={4} xl={3} style={{ padding: 'unset' }}>
                <div >
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder=""
                            aria-label="search"
                            aria-describedby="basic-addon2"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                        />
                        <InputGroup.Append>
                            <Button onClick={() => search()} className="default-outline-btn" variant="outline-default">Search</Button >
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </Col>
            <Row>
                {data.length > 0 ?
                    data.map((value, index) => {
                        let isVideo = value.name && (value.name.split(".")[1] === 'webm' || value.name.split(".")[1] === 'mkv' || value.name.split(".")[1] === 'mp4');
                        let videoExtension = value.name && value.name.split(".")[1];
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} xl={3} style={{ marginTop: 20, padding: '0 10px' }} key={index}>
                                <div style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)', }}>
                                    {
                                        value.text ?
                                            <WordCloudComponent text={value.text} words={Utils.getWords(value.text)} type={'uploads'} />
                                            : <h4 style={{ textAlign: 'center' }}>No transcriptions</h4>
                                    }
                                    <div style={{ flexGrow: 1 }} />
                                    {
                                        isVideo ?
                                            value.name && value.name !== 'null' && <ReactPlayer
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
                                            value.name && value.name !== 'null' && <div>
                                            <ReactPlayer height={50} width={'100%'} url={config.googleBucketURL + value.name} controls={true} />
                                        </div>
                                    }
                                    <div style={{ flex: 1, marginTop: 10, textAlign: 'center' }}>
                                        <p>{utils.getDate(value.created_at)}</p>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                    :
                      null
                }
                {
                    !loading && !data.length && <Alert color="warning" variant={'warning'} style={{ margin: '0 auto' }}>
                        {'No records are found'}
                    </Alert>
                }
            </Row>
            {
                !loading? <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <button onClick={() => previousPage()} disabled={skip === 1} style={{ backgroundColor: '#6e6e6e', margin: '0 10px', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img style={{ width: 12, height: 12 }} src={LeftImage} />
                    </button>
                    -
                    <button onClick={() => nextPage()} style={{ backgroundColor: '#6e6e6e', margin: '0 10px', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img style={{ width: 12, height: 12 }} src={RightImage} />
                    </button>
                </div> : null
            }
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    loadData: bindActionCreators(getGalleries, dispatch),
})
const mapStateToProps = state => {
    return {
        data: state.recordData.galleries,
        loading: state.recordData.loading,
        loaded: state.recordData.loaded,
        error: state.recordData.error,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Explore)