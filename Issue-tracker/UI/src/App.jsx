/* globals React  ReactDOM*/
import "babel-polyfill";
import "whatwg-fetch";
import React from "react"
import './Style.css';
import ReactDOM from "react-dom";
import IssueList from "./IssueList";


ReactDOM.render(<IssueList />, document.getElementById('contents'));
if (module.hot){
  module.hot.accept()
  }