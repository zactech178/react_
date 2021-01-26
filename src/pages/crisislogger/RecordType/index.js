import React from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Button } from 'react-bootstrap'
import './style.scss'
import Utils from "../../../util/Utils";

const RecordType = (props) => {
    const { t } = useTranslation()
    const utils = new Utils();
    const space = {
        marginRight: 5,
        marginLeft: 5,
        padding: '15px 30px',
    }

    const selectType = (type) => () => {
        localStorage.setItem('recordType', type)
        props.history.push('/share-message')
    }

    return (
        <div className="record-type-container">
            <Row>
                <div className="title-container" style={{ width: '100%', marginTop: '100px', marginBottom: '50px' }}>
                    <h1 className="text-align-center grey-title">{t(utils.getsubDomain()+'.recordType.title')}</h1>
                </div>
                <Row className="button-container"  style={{ width: '100%', justifyContent: 'space-around' }}>
                    <Col className="button-col">
                        <Button 
                            onClick={selectType('audio')}
                            size={'lg'} 
                            style={space}
                        >{t(utils.getsubDomain()+'.recordType.audioButton')}</Button>
                    </Col>
                    <Col className="button-col">
                        <Button 
                            onClick={selectType('video')} 
                            size={'lg'} 
                            style={space}
                        >{t(utils.getsubDomain()+'.recordType.videoButton')}</Button>
                    </Col>
                    <Col className="button-col">
                        <Button 
                            onClick={selectType('text')} 
                            size={'lg'} 
                            style={space}
                        >{t(utils.getsubDomain()+'.recordType.textButton')}</Button>
                    </Col>
                </Row>
            </Row>
        </div>
    )
}

export default RecordType