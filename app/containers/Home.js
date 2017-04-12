require('normalize.css/normalize.css')

import React, { Component } from 'react'

//react-bootstrap
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'

//utils
import {oauthVerification} from '../utils/oauthVerification'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'

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

  /**
 * Handle go svg
 *
 * @method handleGoSVG
 */
  handleGoSVG() {

    this.context.router.replace('svgdisplay');

  }

  /**
   * Handle go shots
   *
   * @method handleGoShots
   */
  handleGoInfoDisplay() {

    this.context.router.replace('infodisplay');

  }

  render() {

    return (

      <div>
        <Header></Header>
        <div className="home-title">WHERE TO GO?</div>
        <div className="home-buttons-area">
          <Col xs={12} sm={6}>
            <div className="home-go home-go-svg">
              <Button onClick={this.handleGoSVG.bind(this)} title="GO SVG">GO SVG</Button>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="home-go home-go-info">
              <Button onClick={this.handleGoInfoDisplay.bind(this)} title="GO INFO DISPLAY">GO INFO</Button>
            </div>
          </Col>
        </div>
        <Footer></Footer>
      </div>

    );

  }
  
}

//needed for routing purposes
Home.contextTypes = {
	router: React.PropTypes.object
}

export default Home;
