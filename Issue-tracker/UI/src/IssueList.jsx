/* eslint-disable react/jsx-no-bind */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
// import React from 'react';

import React, { useState, useEffect } from 'react';
import 'whatwg-fetch';
import URLSearchParams from '@ungap/url-search-params';
import Issuefilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import graphQLFetch from './graphQLFetch.js';


// Redoing the IssueList component using Hooks
export default function IssueList() {
  const [issues, updateIssues] = useState([]);
  async function loadData() {
    const query = ` query issueList($status: StatusType ) {
        issueList (status: $status) {
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
      updateIssues(data.issueList);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createIssue(issue) {
    const query = ` mutation issueAdd($issue: IssueInputs!) {
           issueAdd(issue: $issue) {
             id
           }
      }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      loadData();
    }
  }

  return (
    <React.Fragment>
      <h1>Issue Tracker</h1>
      <Issuefilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd createIssue={createIssue} />
    </React.Fragment>
  );
}

// export default class IssueList extends React.Component {
//   constructor(props) {
//     super(props);
//   this.state = {
//     issues: [],
//     };
//     this.createIssue = this.createIssue.bind(this);
//   }

//   componentDidMount() {
//     this.loadData();
//   }

//   componentDidUpdate(prevProps) {
//     const { location: { search: prevSearch } } = prevProps;
//     const { location: { search } } = this.props;
//     if (prevSearch !== search) {
//       this.loadData();
//     }
//   }

//   async loadData() {
//     const { location: { search } } = this.props;
//     const params = new URLSearchParams(search);
//     const vars = {};
//     if (params.get('status')) {
//       vars.status = params.get('status');
//     }
//     const query = ` query {
//         issueList (status: $status) {
//           id
//           title
//           status
//           owner
//           created
//           effort
//           due
//         }
//       }`;

//     const data = await graphQLFetch(query);
//     if (data) {
//       this.setState({ issues: data.issueList });
//     }
//   }

//   async createIssue(issue) {
//     const query = ` mutation issueAdd($issue: IssueInputs!) {
//            issueAdd(issue: $issue){
//              id
//            }
//       }`;

//     const data = await graphQLFetch(query, { issue });
//     if (data) {
//       this.loadData();
//     }
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <h1>Issue Tracker</h1>
//         <Issuefilter />
//         <hr />
//        <IssueTable issues={this.state.issues} />
//         <hr />
//         <IssueAdd createIssue={this.createIssue} />
//       </React.Fragment>
//     );
//   }
// }
