const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db');

async function list(_, { status }) {
  const db = getDb();
  const filter = {};
  if (status) {
    filter.status = status;
  }
  const issues = await db.collection('issues').find(filter).toArray();
  return issues;
}


function validateIssue(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { issue }) {
  const db = getDb();
  validateIssue(issue);

  const newIssues = Object.assign({}, issue);
  newIssues.created = new Date();
  newIssues.id = await getNextSequence('issues');

  const result = await db.collection('issues').insertOne(newIssues);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

module.exports = { list, add };
