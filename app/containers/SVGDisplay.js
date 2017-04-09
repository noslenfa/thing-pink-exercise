require('normalize.css/normalize.css');

import React, { Component } from 'react';

class SVGDisplay extends Component {
  constructor(props, context){
		super(props);
    context.router;
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
