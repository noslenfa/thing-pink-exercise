require('./assets/styles/app.scss');

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import store from './store/store'

const app = document.getElementById('app');

// Render the main component into the dom
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);
