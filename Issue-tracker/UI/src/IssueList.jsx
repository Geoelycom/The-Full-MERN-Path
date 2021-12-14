import React from "react";
import Issuefilter from "./IssueFilter";
import IssueTable from "./IssueTable";
import IssueAdd from "./IssueAdd";


export default class IssueList extends React.Component{
  render(){
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
          <Issuefilter />
          <hr/>
          <IssueTable />
          <hr/>
          <IssueAdd />
      </React.Fragment>
    )
  }
}