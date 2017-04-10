require('normalize.css/normalize.css')

import React, { Component } from 'react'

//utils
import {oauthVerification} from '../utils/oauthVerification'

/**
 * Class SVGDisplay
 * @extends Component
 */
class SVGDisplay extends Component {

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
