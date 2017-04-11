import React, { Component } from 'react'

//components
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Class NotFound
 * @extends Component
 */
class NotFound extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="notfound-404">404</div>
        <div className="notfound-page">PAGE NOT FOUND</div>
        <Footer />
      </div>
    );
  }
}

export default NotFound;
