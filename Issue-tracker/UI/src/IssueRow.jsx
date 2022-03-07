/* eslint-disable object-curly-newline */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function IssueRow(props) {
  const { issue } = props;
  const selectLocation = { pathname: `/issues/${issue.id}` };
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ''}</td>
      <td>{issue.title}</td>
      <td>
        <Link to={`/edit/${issue.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
      </td>
    </tr>
  );
}


export default IssueRow;
