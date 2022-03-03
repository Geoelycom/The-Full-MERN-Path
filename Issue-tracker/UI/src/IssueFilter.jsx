import React from 'react';
// eslint-disable-next-line react/prefer-stateless-function
export default function Issuefilter() {
  return (
    <div>
      <a href="/#/issues">All Issues </a>
      {' | '}
      <a href="/#/issues?status=New">New Issues </a>
      {' | '}
      <a href="/#/issues?status=Assigned">Assigned Issues </a>
    </div>
  );
}
