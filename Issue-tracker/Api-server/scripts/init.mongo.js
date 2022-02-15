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
db.issues.deleteMany({})

const issueDB = [{
  id: 1,
  status: 'New',
  owner: 'Elyan',
  effort: 5,
  created: new Date('2021-12-21'),
  due: undefined,
  title: 'Error in console when clicking Add',
},

{
  id: 2,
  status: 'Assigned',
  owner: 'Uduak',
  effort: 25,
  created: new Date('2021-12-22'),
  due: new Date('2021-12-30'),
  title: 'Missing bottom border on panel',
}
]

db.issues.insertMany(issueDB);
const count = db.issues.countDocuments();
print('inserted', count, 'issues');


db.issues.createIndex({id: 1}, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 })
