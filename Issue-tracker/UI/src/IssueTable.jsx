import React from "react"
import IssueRow from "./IssueRow";

const issues = [{
  id: 1, status: 'New', owner: 'pete', effort: 7,
  created: new Date('2021-12-28'), due: new Date('2021-12-31'),
  title: 'Error in pushing commit changes',
},

{
  id: 2, status: 'Assigned', owner: 'Mary', effort: 5,
  created: new Date('2021-12-26'), due: undefined,
  title: 'Error in adding new issue',

}
]

export default class IssueTable extends React.Component{
  render(){
    const issueRows = issues.map(issue => 
      <IssueRow key={issue.id} issue={issue} />
    )
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
}