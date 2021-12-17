const fs = require('fs')
const express = require('express')
const { ApolloServer, gql } =  require("apollo-server-express");
let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
  Query: {
    about: () => aboutMessage,
  },
  Mutation: {
    setAboutMessage,
  }
};

function setAboutMessage( _, { message }){
  return aboutMessage = message;
}

const server = new ApolloServer({
  typeDefs : fs.readFileSync('../Api-server/schema.graphql', 'utf-8'),
  resolvers,
});

const app  = express()
app.use(express.static('public'))
server.applyMiddleware({app, path: '/graphql' })

app.listen(4000, () => {
  console.log('server started on port 4000')
})