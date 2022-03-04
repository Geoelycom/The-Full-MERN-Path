import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prefer-stateless-function
export default function Issuefilter() {
  const navigate = useNavigate();
  function onChangeStatus(e) {
    const status = e.target.value;
    navigate({
      pathname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }
  return (
    <div>
      Status:
      {' '}
      <select onChange={onChangeStatus}>
        <option value="">(All)</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
        <option value="Fixed">Fixed</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
