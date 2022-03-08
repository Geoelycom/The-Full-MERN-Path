import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import URLSearchParams from '@ungap/url-search-params';
// eslint-disable-next-line react/prefer-stateless-function
export default function Issuefilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = new URLSearchParams(search);
  const [inputStatus, inputStatusUpdate] = useState(params.get('status') || '');
  const [changed, isChanged] = useState(false);

  function showOriginalFilter() {
    inputStatusUpdate(params.get('status') || '');
    isChanged(false);
  }

  function onChangeStatus(e) {
    inputStatusUpdate(e.target.value);
    isChanged(true);
  }

  function applyFilter() {
    navigate({
      pathname: '/issues',
      search: inputStatus ? `?status=${inputStatus}` : '',
    });
  }

  useEffect(() => {
    showOriginalFilter();
  }, [location]);

  return (
    <div>
      Status:
      {' '}
      <select value={inputStatus} onChange={onChangeStatus}>
        <option value="">(All)</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
        <option value="Fixed">Fixed</option>
        <option value="Closed">Closed</option>
      </select>
      {' '}
      <button type="button" onClick={applyFilter}>Apply</button>
      {' '}
      <button type="button" onClick={showOriginalFilter} disabled={!changed}>Reset</button>
    </div>
  );
}
