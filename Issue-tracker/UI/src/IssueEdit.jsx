import React from 'react';
import { useParams } from 'react-router-dom';

export default function IssueEdit() {
  const { id } = useParams();
  return (
    <h2>
      {`This is a placeholder for editing issue ${id}`}
    </h2>
  );
}
