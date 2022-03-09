/* eslint-disable object-curly-newline */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint-disable react/jsx-no-bind */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */

import React, { useState, useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import URLSearchParams from '@ungap/url-search-params';
import 'whatwg-fetch';
import Issuefilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';
import graphQLFetch from './graphQLFetch.js';


function loadData() {
  return ` query issueList(
     $status: StatusType
     $effortMin: Int
     $effortMax: Int
    ) {
      issueList(
      status: $status
      effortMin: $effortMin
      effortMax: $effortMax
      ){
        id
        title
        status
        owner
        created
        effort
        due
      }  
}`;
}

export default function IssueList() {
  const [issues, updateIssues] = useState([]);
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const loadIssues = async () => {
    const vars = {};
    if (params.get('status')) {
      vars.status = params.get('status');
    }

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) {
      vars.effortMin = effortMin;
    }
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) {
      vars.effortMax = effortMax;
    }

    const data = await graphQLFetch(loadData(), vars);
    if (data) {
      updateIssues(data.issueList);
    }
  };

  useEffect(() => {
    loadIssues();
  }, [location]); // only Rerun component when the location from the browser changes

  async function createIssue(issue) {
    const query = ` mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue){
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
      <h1> Issue Tracker</h1>
      <Issuefilter />
      <hr />
      <IssueTable issue={issues} />
      <hr />
      <IssueAdd createIssue={createIssue} />
      <hr />
      <Routes>
        <Route path="/:id" element={<IssueDetail />} />
      </Routes>
    </React.Fragment>
  );
}
