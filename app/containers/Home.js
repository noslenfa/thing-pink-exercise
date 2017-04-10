require('normalize.css/normalize.css')

import React, { Component } from 'react'

//router
import {Link} from 'react-router'

//utils
import {oauthVerification} from '../utils/oauthVerification'

/**
 * Class Home
 * @extends Component
 */
class Home extends Component {

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
