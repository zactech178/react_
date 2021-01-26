import React from 'react';
import { useTranslation } from 'react-i18next'
import { Row,  Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import homePageBanner from '../../../assets/homePageBanner.png'
import appConfig from "../../../appConfig.json";
import './style.scss'
import Utils from "../../../util/Utils";
const Home = (props, context) => {
    const { t } = useTranslation();
    const utils = new Utils();
    const gotoShare = () => {
        props.history.push('/share-thought')
    }
    const gotoExplore = () => {
        props.history.push('/explore')
    }
    const space = {
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 10
    }
  return (
    <div className="home-page-container">
        <Row style={{justifyContent: 'center', margin:'unset'}}>
            <img src={require('../../../assets/' + appConfig.APP_HOME_PAGE)} alt={'Home'} />
            <div className="login-link">
                <Link to="/login">{t(utils.getsubDomain()+'.home.login')}</Link>
            </div>
            <div className="title-text">
               <h1>{t(utils.getsubDomain()+'.home.title')}</h1>
            </div>
            <div className="button-container">
                <Button 
                    onClick={gotoShare} 
                    title={'Share your thought'} 
                    size={'lg'}
                    style={space}
                >{t(utils.getsubDomain()+'.home.shareButton')}</Button>
                <Button
                    onClick={gotoExplore}
                    size={'lg'}
                    style={space}
                    title={'Listen to Others\'s thought '} 
                    variant={'outline-primary'}
                    type={'default'} >
                    {t(utils.getsubDomain()+'.home.exploreButton')}
                </Button>
            </div>
            <div className="text-cener">
                <p>{t(utils.getsubDomain()+'.home.text.p1')}</p>
                <p>{t(utils.getsubDomain()+'.home.text.p2')}</p>
                <p>{t(utils.getsubDomain()+'.home.text.p3')}</p>
                <p>{t(utils.getsubDomain()+'.home.text.p4')}</p>
            </div>    
        </Row>
    </div>
  );
}

export default Home;