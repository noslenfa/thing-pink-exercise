require('normalize.css/normalize.css');

import React, { Component } from 'react';

import {OAuth} from 'oauthio-web';

import Button from 'react-bootstrap/lib/Button';

class Login extends Component {
  constructor(props, context){
		super(props);
    context.router;
    this.executeOAuth = this.executeOAuth.bind(this);
	}

  componentWillMount() {
    OAuth.clearCache();
    OAuth.initialize(ENV.OAUTH_IO, {cache:true});
  }

  executeOAuth() {
    //Using popup (option 1)
    OAuth.popup('github')
    .done(function(result) {
        console.log('result ', result);
     //use result.access_token in your API request
     //or use result.get|post|put|del|patch|me methods (see below)
    })
    .fail(function (err) {
        console.log('err ', err);
     //handle error with err
    });
  }

  render() {

    return (
      <div>
        <div className="container login-area">
            <div className="text-center">
              <Button bsStyle="primary" onClick={this.executeOAuth}>Connect with Github</Button>
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
