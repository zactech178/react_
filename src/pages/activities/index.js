import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActivityListItem from '../../components/mindlogger/ActivityListItem';
import { appletSelector } from '../../state/user/user.selectors';

const Activities = ({ applets }) => {
  return (
    <div className="Item-list">
        <Link to="/applets" className="List-item-container">
          <ActivityListItem/>
        </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  applets: appletSelector(state),
});

export default connect(mapStateToProps, null)(Activities);