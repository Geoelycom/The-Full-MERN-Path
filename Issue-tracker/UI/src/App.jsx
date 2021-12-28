/* globals React  ReactDOM*/
import "babel-polyfill";
import "whatwg-fetch";
import React from "react"
import ReactDOM from "react-dom";
import IssueList from "./IssueList";

const element = <IssueList/>

function IssueRow(props){
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created}</td>
      <td>{issue.effort}</td>
      <td>{issue.due}</td>
      <td>{issue.title}</td>
    </tr>
  )
}


ReactDOM.render(element, document.getElementById('contents'));
if (module.hot){
  module.hot.accept()
  }