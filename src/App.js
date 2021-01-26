import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/crisislogger/reducer'
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/crisislogger/NavBar';
import { Container } from 'react-bootstrap'
import Login from './pages/crisislogger/Login';
import Home from './pages/crisislogger/Home';
import Register from './pages/crisislogger/Register'
import Choice from './pages/crisislogger/Choice'
import RecordType from './pages/crisislogger/RecordType'
import SharedMessage from './pages/crisislogger/SharedMessage'
import Dashboard from './pages/crisislogger/Dashboard'
import Profile from './pages/crisislogger/Profile'
import Privacy from './pages/crisislogger/Privacy'
import AppletList from './pages/appletList';
import Activities from './pages/activities';
import PrivateRoute from './components/crisislogger/PrivateRouter'
import Questionnaire from './pages/crisislogger/Questionnaire'
import Explore from './pages/crisislogger/Explore';
import AdminDashboard from './pages/crisislogger/Admin/Dashboard'
import RecordDetails from './pages/crisislogger/Admin/RecordDetail'
import { userSelector } from './state/user/user.selectors';
import CMILogo from './assets/CMI_spot_logo.jpg'
import ParentsLogo from './assets/parents_magazine_logo.png'
import NMILogo from './assets/nimh-logo.png'
import OpenHumansLogo from './assets/open-humans.png'
import CRILogo from './assets/CRI.png'
import MCGovernLogo from './assets/mcgovern_logo.png'
import './App.scss'
import { ROLES } from './util/Constants';

const App = () => {
  const token = localStorage.getItem('token')
  const isLoggedIn = (token && token !== '');
  return (
    <Container className={'main-container'}>
      <NavBar isLoggedIn={isLoggedIn}/>
      <Container style={{justifyContent: 'center', margin: 'unset'}} className={'app-container'}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/activities" exact component={Activities} />
            <Route path="/applets" exact component={AppletList} />
            <Route path="/"  exact component={Home} />
            <Route path="/login" exact component={ Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute role={ROLES.user} path="/dashboard" exact component={Dashboard} />
            <PrivateRoute role={ROLES.admin} path="/admin" exact component={AdminDashboard} />
            <PrivateRoute role={ROLES.admin} path="/admin/record" exact  component={RecordDetails} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <Route path="/share-thought" exact component={Choice} />
            <Route path="/questionnaire" exact component={Questionnaire} />
            <Route path="/record-type" exact component={RecordType} />
            <Route path="/privacy" exact component={Privacy} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/record" exact component={SharedMessage} />
          </Switch>
        </ConnectedRouter>
      </Container>
      <CLAppFooter />
    </Container>
  )
}
const CLAppFooter = () => {
  return (
      <footer style={{marginTop: 40}} className="app-footer" id="">
        <div className="container  kt-container--fluid ">
          <div className="kt-footer__copyright" style={{width: '100%', paddingTop: 15}}>
            <div className="row text-center footer-row" style={{width: '100%', justifyContent: 'space-around'}}>
              <p className="" style={{fontSize: '1 rem'}}><a href="/privacy" style={{color: '#74788d'}}>Privacy</a></p>
              <p className=" " style={{fontSize: '1 rem', color: '#74788d'}}>©2020 Child Mind Institute</p>
              <a href="https://childmind.org"><img className="footer-logos" src={CMILogo} alt="" style={{minHeight: 40}}/></a>
              <a href="https://www.parents.com/"><img className="footer-logos" src={ParentsLogo} alt=""/></a>
              <a href="https://www.nimh.nih.gov/index.shtml"><img className="footer-logos" src={NMILogo} alt="" style={{minHeight: 30}}/></a>
              <a href="https://www.openhumans.org/"><img className="footer-logos" src={OpenHumansLogo} alt="" style={{maxHeight: 30}}/></a>
              <a href="https://cri-paris.org"><img className="footer-logos" src={CRILogo} alt="" style={{minHeight: 50}}/></a>
              <a href="https://mcgovern.mit.edu/"><img className="footer-logos" src={MCGovernLogo} alt="" style={{minHeight: 50, marginTop: -5}}/></a>
            </div>
          </div>
        </div>
      </footer>
  )
}
const mapStateToProps = state => ({
  user: userSelector(state),
});

export default connect(mapStateToProps, null) (App)
  