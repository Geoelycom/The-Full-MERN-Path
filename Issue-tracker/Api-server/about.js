let aboutMessage = 'Issue Tracker API v1.0';

function setMessage(_, { message }) {
  aboutMessage = message;
}

function getMessage() {
  return aboutMessage;
}

module.exports = { setMessage, getMessage };
