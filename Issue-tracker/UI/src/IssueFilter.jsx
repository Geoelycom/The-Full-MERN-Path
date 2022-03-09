import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import URLSearchParams from '@ungap/url-search-params';
// eslint-disable-next-line react/prefer-stateless-function
export default function Issuefilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = new URLSearchParams(search);
  const [changed, isChanged] = useState(false);
  const [inputStatus, inputStatusUpdate] = useState(params.get('status') || '');
  const [effortMin, updateEffortMin] = useState(params.get('effortMin') || '');
  const [effortMax, updateEffortMax] = useState(params.get('effortMax') || '');

  function showOriginalFilter() {
    inputStatusUpdate(params.get('status') || '');
    updateEffortMin(params.get('effortMin') || '');
    updateEffortMax(params.get('effortMax') || '');
    isChanged(false);
  }

  function onChangeStatus(e) {
    inputStatusUpdate(e.target.value);
    isChanged(true);
  }

  function applyFilter() {
    if (inputStatus) {
      params.set('inputStatus', inputStatus);
    }
    if (effortMin) {
      params.set('effortMin', effortMin);
    }
    if (effortMax) {
      params.set('effortMax', effortMax);
    }
    const searchUrl = params.toString() ? `?${params.toString()}` : '';
    navigate({
      pathname: '/issues',
      search: searchUrl,
    });
  }

  function onChangeEffortMin(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      updateEffortMin(e.target.value);
      isChanged(true);
    }
  }

  function onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      updateEffortMax(e.target.value);
      isChanged(true);
    }
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
      Effort between
      {' '}
      <input
        size={5}
        value={effortMin}
        onChange={onChangeEffortMin}
        placeholder="min"
      />
      {' _ '}
      <input
        size={5}
        value={effortMax}
        onChange={onChangeEffortMax}
        placeholder="max"
      />
      <button type="button" onClick={applyFilter}>Apply</button>
      {' '}
      <button type="button" onClick={showOriginalFilter} disabled={!changed}>Reset</button>
    </div>
  );
}
