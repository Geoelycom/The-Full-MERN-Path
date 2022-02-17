const fs = require('fs')
const express = require('express')
const { GraphQLScalarType } = require('graphql')
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { Kind } = require('graphql/language');
const { MongoClient } = require ('mongodb');
require('dotenv').config();

const uri = "mongodb+srv://Elyan:"+ process.env.DB_URI +"@userproifle.g0qgd.mongodb.net/IssueDatabase?retryWrites=true&w=majority";

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

let db;

let aboutMessage = "Issue Tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },

  parseValue(value) {
    const dateValue = new Date(value)
    return isNaN(dateValue) ? undefined : dateValue;
  },

  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value)
      return isNaN(value) ? undefined : value;
    }
  }

})

function validateIssue(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status == 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors })
  }
}


const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },

  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function issueList() {
  const issues =  await db.collection('issues').find({}).toArray()
  return issues;
}

async function getNextSequence(name){
  const result = await db.collection('counters').findOneAndUpdate(
    {_id: name },
    { $inc: { current: 1 }},
    { returnNewDocument: false },
    );
    return result.value.current
  }

 async function issueAdd(_, { issue }) {
  validateIssue(issue);
  issue.created = new Date();
  issue.id = await getNextSequence('issues');

  const result = await db.collection('issues').insertOne(issue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId })
  return savedIssue;
}

async function connectToDb(){
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect();
  console.log('connected to MongoDb at', uri);
  db = client.db();
}


const server = new ApolloServer({
  typeDefs: fs.readFileSync('../Api-server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error)
    return error;
  }
});
const app = express()
app.use(express.static('public'))
server.applyMiddleware({app, path: '/graphql' })

//Using an IIFE  to connect to the database would throw an error  so i had to wrap the async function inside the app.listen as a callback hence running our synchronous activities

app.listen(3000, async () => {
  try {
   await connectToDb()
   console.log('App started at port 3000')
  } catch (err){
   console.log('Error:', err)
  }
})
