import React from "react"
import IssueRow from './IssueRow';

function IssueTable(props){
   const issueRows = props.issues.map(issue=> (
     <IssueRow key={issue.id} issue={issue} />
   ))
    return (
      <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
       </tr>
      </thead>
        <tbody> 
          {issueRows}
        </tbody>
      </table>
    );
  }
export default IssueTable;
