/*global ENV:true*/
/*eslint no-undef: "error"*/

require('normalize.css/normalize.css');

import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchShots } from '../actions/infodisplayActions'

const mapStateToProps = (state) => {
  return state;
}

class InfoDisplay extends Component {
  constructor(props, context){
		super(props);
    context.router;
	}

  componentWillMount() {
    this.props.dispatch(fetchShots());
  }

  render() {

    return (
      <div>
        INFO DISPLAY
      </div>
  );
  }
}

//needed for routing purposes
InfoDisplay.contextTypes = {
	router: React.PropTypes.object
}

InfoDisplay = connect(mapStateToProps)(InfoDisplay);

export default InfoDisplay;
