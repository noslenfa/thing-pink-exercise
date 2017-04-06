import React from 'react';

import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from 'react-router/lib/browserHistory';

//containers
import Login from './Login';

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path={'/'} handler={App}>
          <IndexRedirect to="login" />
          <Route path={'login'} component={Login} />
        </Route>
      </Router>
    );
  }
}

export default App;
