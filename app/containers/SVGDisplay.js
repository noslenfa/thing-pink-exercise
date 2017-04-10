require('normalize.css/normalize.css')

import React, { Component } from 'react'

//utils
import {oauthVerification} from '../utils/oauthVerification'

class SVGDisplay extends Component {
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
      <div>
        <div className="svg-div-one"></div>
        <div className="svg-div-two"></div>
      </div>
  );
  }
}

//needed for routing purposes
SVGDisplay.contextTypes = {
	router: React.PropTypes.object
}

export default SVGDisplay;
