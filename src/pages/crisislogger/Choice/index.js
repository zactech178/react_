import React from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Button } from 'react-bootstrap'
import Utils from "../../../util/Utils";
import './style.scss'

const Choice = (props) => {
    const { t } = useTranslation()
    const utils  = new Utils();
    const blockNames = [
        {i18nName: 'parent', role: 1},
        {i18nName: 'teacher', role: 2},
        {i18nName: 'student', role: 3},
        {i18nName: 'healthWorker', role: 4},
        {i18nName: 'patient', role: 5},
        {i18nName: 'other', role: 6}
    ]
    const space = {
        marginRight: 5,
        marginLeft: 5,
        marginBottom: '1rem'
    }

    const choiceRole = (role) => () => {
        localStorage.setItem('role', role)
        props.history.push('/record')
    }
    return (
        <div className="select-choice-container">
            <Row>
                <div className="text-align-center" style={{ marginTop: '100px' }}>
                    <h1 className="grey-title">{t(utils.getsubDomain()+'.choice.title')}</h1>
                </div>
                <div className="text-align-center" style={{ width: '100%' }}>
                    <h4 className="grey-text" >{t(utils.getsubDomain()+'.choice.text')}</h4>
                </div>
                <Row className="choice-container" style={{ width: '100%' }}>
                    {blockNames.map((block, index) => (
                        <Col sm={{ span: 12 }} key={index} md={{ span: 6 }} lg={{span: 4}} style={{marginBottom: '3rem'}} >
                            <div className={'outline-primary'}>
                                <div className={'text-center'}>
                                <Button 
                                    onClick={choiceRole(block.role)} 
                                    title={t(`${utils.getsubDomain()}.choice.${block.i18nName}.button`)}
                                    size={'lg'}
                                    className="choice-button"
                                    style={space}
                                >{t(`${utils.getsubDomain()}.choice.${block.i18nName}.button`)}</Button>
                                </div>
                            <p className="grey-text">{t(`${utils.getsubDomain()}.choice.${block.i18nName}.text`)}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Row>
        </div>
    )
}

export default Choice