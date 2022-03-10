import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';

export default function IssueEdit() {
  const [issues, updateIssue] = useState({});
  const { id } = useParams();

  function onChange(e) {
    const { name, value } = e.target;
    updateIssue(prevState => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(issues);
  }

  async function loadData() {
    const query = `query issue($id: Int!) {
        issue(id: $id) { 
           id
           title
           status
           owner
           effort
           created
           due
           description
    }
  }`;
    const data = await graphQLFetch(query, { id });
    if (data) {
      const { issue } = data;
      issue.due = issue.due ? issue.due.toDateString() : '';
      issue.created = issue.created ? issue.created.toDateString() : '';
      issue.effort = issue.effort != null ? issue.effort.toString() : '';
      issue.owner = issue.owner != null ? issue.owner : '';
      issue.description = issue.description != null ? issue.description : '';
      updateIssue(issue);
    } else {
      updateIssue({});
    }
  }

  if (id == null) {
    if (id != null) {
      return <h3>{`Issue with ID ${id} not found`}</h3>;
    }
    return null;
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>{`Editing issue: ${id}`}</h3>
      <table>
        <tbody>
          <tr>
            <td>Created:</td>
            <td>{issues.created}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <select name="status" value={issues.status || ''} onChange={onChange}>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Owner:</td>
            <td>
              <input
                name="owner"
                value={issues.owner || ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td>Effort:</td>
            <td>
              <input
                name="effort"
                value={issues.effort || ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td>Due:</td>
            <td>
              <input
                name="due"
                value={issues.due || ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>
              <input
                size={50}
                name="title"
                value={issues.title || ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <textarea
                rows={8}
                cols={50}
                name="description"
                value={issues.description || ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td><button type="submit">Submit</button></td>
          </tr>
        </tbody>
      </table>
      <Link to={`/edit/${issues.id - 1}`}>Prev</Link>
      {' | '}
      <Link to={`/edit/${issues.id + 1}`}>Next</Link>
    </form>
  );
}
