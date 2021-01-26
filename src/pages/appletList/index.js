import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppletListItem from '../../components/mindlogger/AppletListItem';
import { appletSelector } from '../../state/user/user.selectors';
import { setCurrentApplet } from '../../state/app/app.actions';


const Applets = ({ setCurrentApplet, applets }) => {
  const items = applets.map((applet, index) => (
    <Link key={index} to="/activities" className="List-item-container">
      <AppletListItem name={applet.applet["schema:description"]} onClick={setCurrentApplet} />
    </Link>
  ))
  return (
    <div className="Item-list">
      {items}
    </div>
  );
}

const mapStateToProps = state => ({
  applets: appletSelector(state),
});

const mapDispatchToProps = {
  setCurrentApplet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Applets);