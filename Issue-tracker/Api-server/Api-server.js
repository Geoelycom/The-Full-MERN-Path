const fs = require('fs')
const express = require('express')
const { GraphQLScalarType } = require ('graphql')
const { ApolloServer } =  require("apollo-server-express");
const { Kind } = require('graphql/language')



let aboutMessage = "Issue Tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value){
    return value.toISOString();
  },

  parseValue(value){
     return new Date(value);
  },

  parseLiteral(ast){
     return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  }

})

const issueDB = [
  {
    id: 1, status: 'New', owner: 'Elyan', effort: 5, 
    created: new Date('2021-12-21'), due: undefined,
    title: 'Error in console when clicking Add',
  },

  {
    id: 2, status: 'Assigned', owner: 'Uduak', effort: 25, 
    created: new Date('2021-12-22'), due: new Date('2021-12-30'),
    title: 'Missing bottom border on panel',
  }
]

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

function setAboutMessage( _, { message }){
  return aboutMessage = message;
}

function issueAdd (_, { issue }){
 issue.created = new Date();
 issue.id = issueDB.length + 1;
  if(issue.status == undefined) {
    issue.status = 'New';
    issueDB.push(issue);
    }
    return issue;
  }

function issueList(){
  return issueDB;
}

const server = new ApolloServer({
  typeDefs : fs.readFileSync('../Api-server/schema.graphql', 'utf-8'),
  resolvers,
});

const app  = express()
app.use(express.static('public'))
server.applyMiddleware({ app, path: '/graphql' })

app.listen(3000, () => {
  console.log('server started on port 3000')
})
