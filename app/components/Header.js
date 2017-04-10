require('normalize.css/normalize.css');

import React, {Component} from 'react'

//react-bootstrap
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader'
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle'
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse'
import NavItem from 'react-bootstrap/lib/NavItem'

//oauth used for authentication
import {OAuth} from 'oauthio-web'

/**
 * Class Header
 * @extends Component
 */
class Header extends Component {

  /**
   * Constructor
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context){
		super(props);
    context.router;
	}

  /**
   * Logout from App and redirect to login
   *
   * @method logoutApp
   */
  logoutApp() {
    OAuth.clearCache();
    this.context.router.replace('login');
  }

  render() {
    return (
      <div>
        <Navbar fluid collapseOnSelect className="navbar">
          <NavbarHeader>
              <a title="GO THING PINK" href="http://thing-pink.pt">
                <div className="navbar-header-logo"></div>
              </a>
            <NavbarToggle />
          </NavbarHeader>
          <NavbarCollapse>
            <Nav pullRight>
              <NavItem>
                <div title="LOGOUT" onClick={this.logoutApp.bind(this)}>
                  LOGOUT
                  <i className="icon fa fa-sign-out navbar-symbol"></i>
                </div>
              </NavItem>
            </Nav>
          </NavbarCollapse>
        </Navbar>
      </div>
    );
  }
}

//needed for routing purposes
Header.contextTypes = {
	router: React.PropTypes.object
}

export default Header;
