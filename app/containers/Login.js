/*global ENV:true*/
/*eslint no-undef: "error"*/

require('normalize.css/normalize.css');

import React, { Component } from 'react';

import {OAuth} from 'oauthio-web';

//react bootstrap
import Button from 'react-bootstrap/lib/Button';

class Login extends Component {
  constructor(props, context){
		super(props);
    context.router;
	}

  componentWillMount() {
    OAuth.clearCache();
    OAuth.initialize(ENV.OAUTH_IO_KEY, {cache:true});
  }

  executeOAuth(provider) {
    //Using popup (option 1)
    OAuth.popup(provider)
    .done(result => {
      /* eslint-disable no-console */
      console.log('result ', result);
      /* eslint-enable no-console */
      this.context.router.replace('home');
     //use result.access_token in your API request
     //or use result.get|post|put|del|patch|me methods (see below)
    })
    .fail(err => {
      /* eslint-disable no-console */
      console.log('err ', err);
      /* eslint-enable no-console */
     //handle error with err
    });
  }

  render() {

    return (
      <div>
        <div className="container login-area">
            <div className="text-center">
              <Button bsStyle="primary" onClick={this.executeOAuth.bind(this, 'facebook')}>Connect with Facebook</Button>
              <Button bsStyle="primary" onClick={this.executeOAuth.bind(this, 'github')}>Connect with Github</Button>
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
