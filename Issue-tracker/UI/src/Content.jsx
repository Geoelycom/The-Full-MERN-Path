import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';

const NotFound = () => <h1> Page Not Found </h1>;

export default function Contents() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/issues" />} />
      <Route path="/issues" element={<IssueList />} />
      <Route path="/report" element={<IssueReport />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/edit/:id" element={<IssueEdit />} />
    </Routes>
  );
}

// edit/:id
