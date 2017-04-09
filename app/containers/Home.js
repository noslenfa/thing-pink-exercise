require('normalize.css/normalize.css');

import React, { Component } from 'react';
import {Link} from 'react-router';

class Home extends Component {
  constructor(props, context){
		super(props);
    context.router;
	}

  componentWillMount() {
    if(JSON.parse(localStorage.getItem('oauthio_cache'))) {
      const oauthio_cache = JSON.parse(localStorage.getItem('oauthio_cache'));
      const oauthio_provider = Object.keys(oauthio_cache)[0];
      const oauthio_provider_info = JSON.parse(decodeURIComponent(localStorage.getItem(oauthio_provider)));

        if (!(oauthio_provider_info && 'access_token' in oauthio_provider_info && oauthio_provider_info.access_token)) {
          this.context.router.replace('login');
        }
    } else {
      this.context.router.replace('login');
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
