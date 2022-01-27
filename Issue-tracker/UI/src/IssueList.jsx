import React from "react";
import "whatwg-fetch";
import Issuefilter from "./IssueFilter";
import IssueTable from "./IssueTable";
import IssueAdd from "./IssueAdd";

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value){
  if (dateRegex.test(value)) return new Date(value)
    return value;
  }

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

      const body = await response.text()
      const result = JSON.parse(body, jsonDateReviver)
      this.setState({
        issues: result.data.issueList
      })
    }

    async createIssue(issue){
      const query = ` mutation issueAdd($issue: IssueInputs!) {
           issueAdd(issue: $issue){
             id
           }
      }`;

      const response = await fetch('http://localhost:3000/graphql',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, variables: {issue}})
      });
      this.loadData()
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


