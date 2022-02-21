/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import 'whatwg-fetch';
import Issuefilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class IssueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
    };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
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

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = ` mutation issueAdd($issue: IssueInputs!) {
           issueAdd(issue: $issue){
             id
           }
      }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <Issuefilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    );
  }
}
