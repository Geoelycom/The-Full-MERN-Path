import React from "react";
  function IssueRow (props) {
  const issue = props.issue;
  return (
    <tr>
    <td>{issue.id}</td>
    <td>{issue.status}</td>
    <td>{issue.owner}</td>
    <td>{issue.created}</td>
    <td>{issue.effort}</td>
    <td>{issue.due}</td>
    <td>{issue.title}</td>
  </tr> 
  );
}

export default IssueRow