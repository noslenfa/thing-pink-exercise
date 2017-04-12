require('normalize.css/normalize.css')

import React, { Component } from 'react'
import { connect } from 'react-redux'

//react-bootstrap
import Col from 'react-bootstrap/lib/Col'

//utils
import { oauthVerification } from '../utils/oauthVerification'

// actions
import { changeStrokeColor, changeFillColor, handleMenu } from '../actions/svgDisplayActions'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Map state to props
 *
 * @method mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {

  return state;

}

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

  /**
   * Change svg color
   *
   * @method handleSVGChangeColor
   */
  handleStrokeChangeColor(svgColor) {

    this.props.dispatch(changeStrokeColor(svgColor));

  }

  /**
   * Change svg color
   *
   * @method handleSVGChangeColor
   */
  handleFillChangeColor(svgColor) {

    this.props.dispatch(changeFillColor(svgColor));

  }

  /**
   * Handle menus open and close
   *
   * @method handleMenu
   */
  handleMenu(menu) {

    const leftMenuOpen = this.props.svgDisplay.leftMenuOpen;
    const rightMenuOpen = this.props.svgDisplay.rightMenuOpen;

    // depending on menu (left or rigth) and if it's open or not,
    // add or remove styles to show/hide it
    if (menu === 'left') {
      if (leftMenuOpen) {
        document.getElementById('svg-menu-left').style.left = '-50px';
        document.getElementById('open-close-left-menu').style.left = '-25px';
      } else {
        document.getElementById('svg-menu-left').style.left = '0';
        document.getElementById('open-close-left-menu').style.left = '25px';
      }
    } else if (menu === 'right') {
      if (rightMenuOpen) {
        document.getElementById('svg-menu-right').style.right = '-50px';
        document.getElementById('open-close-right-menu').style.right = '-25px';
      } else {
        document.getElementById('svg-menu-right').style.right = '0';
        document.getElementById('open-close-right-menu').style.right = '25px';
      }
    }

    this.props.dispatch(handleMenu(menu));

  }

  /**
   * SVG to be displayed
   *
   * @method svgToDisplay
   */
  svgToDisplay() {

    const svgStrokeColor = this.props.svgDisplay.svgStrokeColor;
    const svgFillColor = this.props.svgDisplay.svgFillColor;

    return(
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 viewBox="0 0 161 161.869" enableBackground="new 0 0 161 161.869" xmlSpace="preserve"
    	>
    	<defs>
    		<linearGradient id="skyGradient" x1="100%" y1="100%">
    			 <stop offset="0%" stopColor="lightblue" stopOpacity=".5">
    				 <animate attributeName="stop-color" values="lightblue;blue;red;red;black;red;red;purple;lightblue" dur="14s" repeatCount="indefinite" />
    			 </stop>
    			 <stop offset="100%" stopColor="lightblue" stopOpacity=".5">
    				 <animate attributeName="stop-color" values="lightblue;orange;purple;purple;black;purple;purple;blue;lightblue" dur="14s" repeatCount="indefinite" />
    				 <animate attributeName="offset" values=".95;.80;.60;.40;.20;0;.20;.40;.60;.80;.95" dur="14s" repeatCount="indefinite" />
    			 </stop>
    		 </linearGradient>
    	</defs>

    	<rect x="4.896" y="5.369" className="st0" width="152" height="152" fill="url(#skyGradient)"/>
    	<path className="st1a" stroke={svgStrokeColor} fill={svgFillColor} d="M32.366,38.362h37.655v9.899H57.388v30.19H45v-30.19H32.366V38.362z"/>
    	<path className="st1b" stroke={svgStrokeColor} fill={svgFillColor} d="M81.644,38.362h12.387V52.39h13.537V38.362h12.442v40.089h-12.442V62.235H94.031v16.216H81.644V38.362z"/>
    	<path className="st1c" stroke={svgStrokeColor} fill={svgFillColor} d="M38.896,88.862h20.592c4.484,0,7.844,1.066,10.077,3.199c2.232,2.133,3.35,5.168,3.35,9.106
    		c0,4.047-1.217,7.21-3.65,9.489c-2.435,2.279-6.148,3.418-11.144,3.418h-6.782v14.876H38.896V88.862z M51.338,105.953h3.035
    		c2.389,0,4.065-0.415,5.032-1.245c0.966-0.829,1.449-1.891,1.449-3.186c0-1.258-0.42-2.324-1.258-3.2
    		c-0.839-0.875-2.416-1.312-4.73-1.312h-3.528V105.953z"/>
    	<path className="st1d" stroke={svgStrokeColor} fill={svgFillColor} d="M80.896,88.862h12.388v15.149l12.977-15.149h16.475l-14.629,15.131l15.286,24.958h-15.256l-8.452-16.486
    		l-6.4,6.704v9.783H80.896V88.862z"/>
    </svg>
    );

  }

  render() {

    return (

      <div>
        <Header></Header>
        <Col xs={12} className="svg-container">
          <div className="svg-display">
            {this.svgToDisplay()}
          </div>
        </Col>
        <div id="svg-menu-left">
          <div className="svg-white" onClick={this.handleFillChangeColor.bind(this, 'white')}></div>
          <div className="svg-red" onClick={this.handleFillChangeColor.bind(this, 'red')}></div>
          <div className="svg-blue" onClick={this.handleFillChangeColor.bind(this, 'blue')}></div>
          <div className="svg-green" onClick={this.handleFillChangeColor.bind(this, 'green')}></div>
          <div className="svg-yellow" onClick={this.handleFillChangeColor.bind(this, 'yellow')}></div>
        </div>
        <div id="svg-menu-right">
          <div className="svg-white" onClick={this.handleStrokeChangeColor.bind(this, 'white')}></div>
          <div className="svg-red" onClick={this.handleStrokeChangeColor.bind(this, 'red')}></div>
          <div className="svg-blue" onClick={this.handleStrokeChangeColor.bind(this, 'blue')}></div>
          <div className="svg-green" onClick={this.handleStrokeChangeColor.bind(this, 'green')}></div>
          <div className="svg-yellow" onClick={this.handleStrokeChangeColor.bind(this, 'yellow')}></div>
        </div>
        <div id="open-close-left-menu" onClick={this.handleMenu.bind(this, 'left')}><i className="fa fa-paint-brush"></i></div>
        <div id="open-close-right-menu" onClick={this.handleMenu.bind(this, 'right')}><i className="fa fa-tint"></i></div>
        <Footer></Footer>
      </div>

    );

  }

}

//needed for routing purposes
SVGDisplay.contextTypes = {
	router: React.PropTypes.object
}

SVGDisplay = connect(mapStateToProps)(SVGDisplay);

export default SVGDisplay;
