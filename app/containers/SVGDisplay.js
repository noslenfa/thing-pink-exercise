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
        SVG DISPLAY
      </div>
  );
  }
}

//needed for routing purposes
SVGDisplay.contextTypes = {
	router: React.PropTypes.object
}

export default SVGDisplay;
