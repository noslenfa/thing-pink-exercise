require('normalize.css/normalize.css')

import React, { Component } from 'react'

//router
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import browserHistory from 'react-router/lib/browserHistory'

//containers
import Login from './Login'
import Home from './Home'
import InfoDisplay from './InfoDisplay'
import SVGDisplay from './SVGDisplay'

/**
 * Class App
 * @extends Component
 */
class App extends Component {

  render() {

    return (
      <Router history={browserHistory}>
        <Route path={'/'} handler={App}>
          <IndexRedirect to="login" />
          <Route path={'login'} component={Login} />
          <Route path={'home'} component={Home} />
          <Route path={'infodisplay'} component={InfoDisplay} />
          <Route path={'svgdisplay'} component={SVGDisplay} />
        </Route>
      </Router>
    );
  }
}

export default App;
