/* globals React  ReactDOM*/
import "babel-polyfill";
import "whatwg-fetch";
import React from "react"
import ReactDOM from "react-dom";
import IssueList from "./IssueList";

      if (module.hot){
        module.hot.accept()
        }


ReactDOM.render(<IssueList />, document.getElementById('contents'));
