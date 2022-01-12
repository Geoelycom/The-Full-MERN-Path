const fs = require('fs')
const express = require('express')
const { GraphQLScalarType } = require ('graphql')
const { ApolloServer, gql } =  require("apollo-server-express");
let aboutMessage = "Issue Tracker API v1.0";


const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value){
    return value.toISOString();
  },
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
  },
  GraphQLDate,
};

function setAboutMessage( _, { message }){
  return aboutMessage = message;
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
