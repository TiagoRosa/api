const {ApolloServer,gql} = require('apollo-server-express')
const express = require('express');

const models = require('./models');

require('dotenv').config();
const db = require('./db');
const { Model } = require('mongoose');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let  notes = [
  {id: '1', content: 'This is a note', author: 'Adam Scott'},
  {id: '2', content: 'This is another note', author: 'Harlow Everly'},
  {id: '3', content: 'Oh hey look, another note!', author: 'Riley harrison'}
];

const typeDefs = gql`
  type Note{
    id: ID!
    content: String!
    author: String!
  },
  type Query{
    hello: String
    notes:[Note!]!
    note(id: ID!): Note!
  },
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent,args) =>{
      return await models.Note.findById(args.id);
    }
  },
  Mutation:{
    newNote: async (parent,args) =>{
      return await models.Note.create({content: args.content,
        author: "Adam Scott"});
    }
  }
};

const app = express();

db.connect(DB_HOST);

const server = new ApolloServer({typeDefs,resolvers});

server.applyMiddleware({app,path:'/api'});

app.listen({port},()=>console.log(`GraphQl Server running at http://localhost:${port}${server.graphqlPath}`));

