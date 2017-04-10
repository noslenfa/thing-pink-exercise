/*global ENV:true*/
/*eslint no-undef: "error"*/
require('normalize.css/normalize.css')

import React, { Component } from 'react'

//oauth used for authentication
import {OAuth} from 'oauthio-web'

//react bootstrap
import Button from 'react-bootstrap/lib/Button'

/**
 * Class Login
 * @extends Component
 */
class Login extends Component {

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
   * Component will mount
   *
   * @method componentWillMount
   */
  componentWillMount() {
    OAuth.clearCache();
    OAuth.initialize(ENV.OAUTH_IO_KEY, {cache:true});
  }

  /**
   * Execute authentication
   *
   * @method executeOAuth
   * @param {string} provider
   */
  executeOAuth(provider) {

    OAuth.popup(provider)
    .done(result => {
      // twitter as a different result so we must treat and save it in localStorage
      if (provider === 'twitter') {
        let access_token = result.oauth_token.toString();
        localStorage.setItem('oauthio_cache', '{"oauthio_provider_twitter":1}');
        localStorage.setItem('oauthio_provider_twitter', `%7B%22access_token%22%3A%22${access_token}%22%7D`);
      }
      /* eslint-disable no-console */
      console.log('result ', result);
      /* eslint-enable no-console */
      this.context.router.replace('home');
    })
    .fail(err => {
      /* eslint-disable no-console */
      console.log('err ', err);
      /* eslint-enable no-console */
    });
  }

  render() {

    return (
      <div className="container login-area">
        <div className="login-area-logo"></div>
        <div className="text-center">
          <div>Welcome to Thing Pink Exercise</div>
          <div>Please sign in to get access</div>
          <div className="login-area-buttons">
            <Button bsStyle="primary" onClick={this.executeOAuth.bind(this, 'facebook')}><i className="fa fa-facebook"></i>Connect with Facebook</Button>
            <Button bsStyle="primary" onClick={this.executeOAuth.bind(this, 'twitter')}><i className="fa fa-twitter"></i>Connect with Twitter</Button>
            <Button bsStyle="primary" onClick={this.executeOAuth.bind(this, 'github')}><i className="fa fa-github"></i>Connect with Github</Button>
          </div>
        </div>
      </div>
    );
  }
}

//needed for routing purposes
Login.contextTypes = {
	router: React.PropTypes.object
}

export default Login;
