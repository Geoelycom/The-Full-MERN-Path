import React from "react";
import "whatwg-fetch";
import Issuefilter from "./IssueFilter";
import IssueTable from "./IssueTable";
import IssueAdd from "./IssueAdd";


export default class IssueList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      issues: []
    }
    this.createIssue = this.createIssue.bind(this)
  }

    componentDidMount(){
      this.loadData();
    }

    async loadData(){
      const query = ` query {
        issueList {
          id
          title
          status
          owner
          created
          effort
          due
        }
      }`;

      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query})
      });

      const result = await response.json();
      this.setState({
        issues: result.data.issueList
      })
    }

    createIssue(issue){
      issue.id = this.state.issues.length + 1;
      issue.created = new Date().toString();
      const newIssueList = this.state.issues.slice();
      newIssueList.push(issue)
      this.setState({
        issues: newIssueList
      });
    }

  render(){
    return (
       <React.Fragment>
         <h1>Issue Tracker</h1>
           <Issuefilter />
          <hr/>
          <IssueTable issues={this.state.issues} />
           <hr/>
           <IssueAdd  createIssue={this.createIssue}/>
       </React.Fragment>
    )
  }
}


