require('normalize.css/normalize.css');

import React, { Component } from 'react';
import {Link} from 'react-router';

//utils
import {oauthVerification} from '../utils/oauthVerification'

class Home extends Component {
  constructor(props, context){
		super(props);
    context.router;
	}

  componentWillMount() {
    if(oauthVerification()) {
      this.context.router.replace('login')
    }
  }

  render() {

    return (
      <div className="container login-area">
          <div className="text-center">
            <div>
              <Link to="/svgdisplay">Go SVG Display</Link>
            </div>
            <div>
              <Link to="/infodisplay">Go Info Display</Link>
            </div>
          </div>
      </div>
  );
  }
}

//needed for routing purposes
Home.contextTypes = {
	router: React.PropTypes.object
}

export default Home;
