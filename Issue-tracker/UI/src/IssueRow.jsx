import React from "react";

  function IssueRow (props) {
  const issue = props.issue;
  return (
    <tr>
    <td>{issue.id}</td>
    <td>{issue.status}</td>
    <td>{issue.owner}</td>
    <td>{issue.created.toString()}</td>
    <td>{issue.effort}</td>
    <td>{issue.due ? issue.due.toString(): ''}</td>
    <td>{issue.title}</td>
  </tr> 
  );
}

export default IssueRow