import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';


ReactDOM.render(
  <Router>
    <Page />
  </Router>, document.getElementById('contents'),

);

if (module.hot) {
  module.hot.accept();
}
