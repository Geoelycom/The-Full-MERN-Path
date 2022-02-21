import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './IssueList.jsx';

if (module.hot) {
  module.hot.accept();
}
ReactDOM.render(<IssueList />, document.getElementById('contents'));
