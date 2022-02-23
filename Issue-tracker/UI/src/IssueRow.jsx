import React from 'react';

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
      <td><a href={`/#/edit/${issue.id}`}>Edit</a></td>
    </tr>
  );
}

export default IssueRow;
