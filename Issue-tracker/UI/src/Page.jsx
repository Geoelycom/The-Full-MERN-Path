import React from 'react';
import { NavLink } from 'react-router-dom';
import Contents from './Content.jsx';

function Navbar() {
  return (
    <nav>
      <NavLink exact="true" to="/">Home</NavLink>
      {' | '}
      <NavLink to="/issues">Issue List</NavLink>
      {' | '}
      <NavLink to="/report">Report</NavLink>
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
