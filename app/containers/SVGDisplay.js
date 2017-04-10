require('normalize.css/normalize.css')

import React, { Component } from 'react'

//utils
import {oauthVerification} from '../utils/oauthVerification'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'

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
        <Header></Header>
        <div className="svg-div-one"></div>
        <div className="svg-div-two"></div>
        <Footer></Footer>
      </div>
    );
  }
}

//needed for routing purposes
SVGDisplay.contextTypes = {
	router: React.PropTypes.object
}

export default SVGDisplay;
