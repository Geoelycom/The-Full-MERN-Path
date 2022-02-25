import React from 'react';
// eslint-disable-next-line react/prefer-stateless-function
export default class Issuefilter extends React.Component {
  render() {
    return (
      <div>
        <a href="/#/issues">All Issues</a>
        {' | '}
        <a href="/#/issues?status=New">Issues</a>
        {' | '}
        <a href="/#/issues?status=Assigned">Assigned Issues</a>
      </div>
    );
  }
}
