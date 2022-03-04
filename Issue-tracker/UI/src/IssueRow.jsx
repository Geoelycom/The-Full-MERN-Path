import React from 'react';
import { Link } from 'react-router-dom';

function IssueRow(props) {
  const { issue } = props;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ''}</td>
      <td>{issue.title}</td>
      <td><Link to={`/edit/${issue.id}`}>Edit</Link></td>
    </tr>
  );
}

export default IssueRow;
