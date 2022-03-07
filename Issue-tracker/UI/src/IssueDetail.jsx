import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';

export default function IssueDetail() {
  const [issue, updatedIssue] = useState({});
  const { id } = useParams();

  const loadData = async () => {
    const query = ` query issue ($id: Int!) {
        issue (id: $id) {
          id
          description
        }
  }`;
    const data = await graphQLFetch(query, { id });
    if (data) {
      updatedIssue(data.issue);
    } else {
      updatedIssue({ issue: {} });
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div>
      <h3> Description</h3>
      <pre>{issue.description}</pre>
    </div>
  );
}
