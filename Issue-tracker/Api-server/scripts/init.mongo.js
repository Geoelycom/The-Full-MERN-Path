/*
 * Run using the mongo shell.for remote databases, ensure that the
 * the local connection string is supplied in the command line. for example
 * Localhost:
 * mongo Issuetracker Api-server/scripts/init.mongo.js
 * Atlas:
 * mongo mongodb+srv://user:pwd@xxx.mongodb.net/Issuetracker Api-server/scripts/init.mongo.js
 * MLab:
 * mongo mongodb://user:pwd@xxx.mlab.com:33533/Issuetracker Api-server/scripts/init.mongo.js
 */

/* global db print */
/* eslint  no-restricted-globals: "off" */

db.issues.deleteMany({});

const issueDB = [{
  id: 1,
  status: 'New',
  owner: 'Elyan',
  effort: 5,
  created: new Date('2021-12-21'),
  due: undefined,
  title: 'Error in console when clicking Add',
  description: 'Steps to recreate the problem:'
      + '\n1. Refresh the browser.'
      + '\n2. Select "New" in the filter'
      + '\n3. Refresh the browser again. Note the warning in the console:'
      + '\n   Warning: Hash history cannot PUSH the same path; a new entry'
      + '\n   will not be added to the history stack'
      + '\n4. Click on Add.'
      + '\n5. There is an error in console, and add doesn\'t work.',
},

{
  id: 2,
  status: 'Assigned',
  owner: 'Uduak',
  effort: 25,
  created: new Date('2021-12-22'),
  due: new Date('2021-12-30'),
  title: 'Missing bottom border on panel',
  description: 'There needs to be a border in the bottom in the panel'
      + ' that appears when clicking on Add',
},
];

db.issues.insertMany(issueDB);
const count = db.issues.countDocuments();
print('inserted', count, 'issues');

db.counters.deleteMany({ _id: 'issues' });
db.counters.insertOne({ _id: 'issues', current: count });
const countIssues = db.counters.countDocuments();
print('Inserted', countIssues, 'counters');

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
