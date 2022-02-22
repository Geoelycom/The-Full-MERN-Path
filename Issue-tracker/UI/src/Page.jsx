import React from 'react';
import Contents from './Content.jsx';

function Navbar() {
  return (
    <nav>
      <a href="/">Home</a>
      {' | '}
      <a href="/#/issues">Issue List</a>
      {' | '}
      <a href="/#/report">Report</a>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <Contents />
    </div>
  );
}
