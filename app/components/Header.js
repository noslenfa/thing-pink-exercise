require('normalize.css/normalize.css');

import React, {Component} from 'react'
import { connect } from 'react-redux'

//react-bootstrap
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader'
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle'
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse'
import NavItem from 'react-bootstrap/lib/NavItem'

//oauth used for authentication
import {OAuth} from 'oauthio-web'

//utils
import {oauthVerification} from '../utils/oauthVerification'

// actions
import { clearShots } from '../actions/infoDisplayActions'

/**
 * Map state to props
 *
 * @method mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
  return state;
}

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
    this.props.dispatch(clearShots());
    this.context.router.replace('login');
  }

  /**
   * Redirect to home view
   *
   * @method handleGoHome
   */
  handleGoHome() {
    this.props.dispatch(clearShots());
    this.context.router.replace('home');
  }

  render() {

    const pathname = this.context.router.location.pathname;
    let homeButton,
      logoutButton;

    if (pathname !== '/home' && pathname !== 'home') {
      homeButton =
        <NavItem>
          <div title="GO HOME" onClick={this.handleGoHome.bind(this)}>
            GO HOME
            <i className="icon fa fa-home navbar-symbol"></i>
          </div>
        </NavItem>
    } else {
      homeButton = null;
    }

    if(!oauthVerification()) {
      logoutButton =
      <NavItem>
        <div title="LOGOUT" onClick={this.logoutApp.bind(this)}>
          LOGOUT
          <i className="icon fa fa-sign-out navbar-symbol"></i>
        </div>
      </NavItem>
    } else {
      logoutButton = null;
    }


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
              { homeButton }
              { logoutButton }
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

Header = connect(mapStateToProps)(Header);

export default Header;
