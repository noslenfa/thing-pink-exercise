require('normalize.css/normalize.css');

import React, { Component } from 'react'

/**
 * Class Footer
 * @extends Component
 */
class Footer extends Component {

  render() {

    return (
        <div className="container footer-container">
            <div className="row footer-text">
                Copyright © 2017, <a href="https://github.com/noslenfa/">NELSON AMARAL</a>, All rights reserved.
            </div>
        </div>
    )
    
  }

}

export default Footer;
