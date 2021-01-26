import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { clearUser } from '../../state/user/user.actions';
import { userSelector } from '../../state/user/user.selectors';
import FontAwesome from 'react-fontawesome';
import { ROLES } from '../../util/Constants';
const NavBar = ({ isLoggedIn }) => {
  const gotoPath = (path) => {
    if(String(path).includes('login'))
    {
      localStorage.clear();
    }
    return window.location.href = path
  }
  const getUserName = () => {
    return localStorage.getItem('user_name')
  }
  if (isLoggedIn) {
    return (
       <Navbar collapseOnSelect={true} expand="xl" bg="light" variant="light" >
       <Navbar.Brand href="/" ><img alt="crisislogger" src="https://crisislogger.org/media/logos/CrisisLogger_logo_border.png" style={{maxHeight: 48}}/></Navbar.Brand>
       <Navbar.Toggle aria-controls="navbar-nav"/>
       <Navbar.Collapse id="navbar-nav " style={{justifyContent: 'flex-end'}} >
         <Nav>
           {
             localStorage.getItem("role")===ROLES.admin?null:(
              <Nav.Link href="/share-thought" className={'btn btn-wide btn-lg'}>Share</Nav.Link>
             )
           }
           
           <Nav.Link href="/explore" className={'btn btn-wide btn-lg'}>Explore</Nav.Link>
           <Nav.Link className={'btn btn-wide btn-lg'}>
            <DropdownButton id="dropdown-basic-button" className={'nav-dropdown-menu'} title={getUserName()}>
              <Dropdown.Item onClick={() => gotoPath(localStorage.getItem("role")===ROLES.user?'/dashboard':'/admin')}><FontAwesome name={'home'} ></FontAwesome>&nbsp;&nbsp;Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => gotoPath('/profile')}><FontAwesome name={'user-circle'} ></FontAwesome>&nbsp;&nbsp;My Account</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => gotoPath('/login')} ><FontAwesome name={'sign-out'} ></FontAwesome>&nbsp;&nbsp;Log Out</Dropdown.Item>
            </DropdownButton>
          </Nav.Link> 
         </Nav>
       </Navbar.Collapse>
     </Navbar>
    );
  } else {
    return (
      <Navbar collapseOnSelect={true} expand="xl" bg="light" variant="light" >
        <Navbar.Brand href="/" ><img alt="crisislogger" src="https://crisislogger.org/media/logos/CrisisLogger_logo_border.png" style={{maxHeight: 48}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav " style={{justifyContent: 'flex-end'}} >
          <Nav>
            <Nav.Link href="/share-thought" className={'btn btn-wide btn-lg'}>Share</Nav.Link>
            <Nav.Link href="/explore" className={'btn btn-wide btn-lg'}>Explore</Nav.Link>
            <Nav.Link href="/login" className={'btn btn-wide btn-lg'}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
