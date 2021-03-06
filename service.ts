import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { mergeSchemas } from 'graphql-tools';
import { buildFederatedSchema } from '@apollo/federation';
const { ApolloLogExtension } = require('apollo-log');
import mongoose from 'mongoose';

import { typeDef } from './src/typedef';
import { SummitGraphqlDemoResolver as resolver } from './src/resolver';
import cookieParser = require('cookie-parser');

/* Setting port for the server */
const port = process.env.PORT || 8080;

const app = express();

// Mount cookie parser
app.use(cookieParser());

const extensions = [() => new ApolloLogExtension({
  level: 'info',
  timestamp: true,
})];

/* Configuring Mongoose */
mongoose.plugin((schema: any) => { schema.options.usePushEach = true; });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

/* Establishing mongodb connection */
const dbConnection = `mongodb+srv://graphqluser:graphqlpwd@mongo-rhzev.mongodb.net/graphql-db?retryWrites=true&w=majority`;

mongoose.connect(dbConnection, { useNewUrlParser: true, useCreateIndex: true }).catch(console.error);

mongoose.connection.on('error', error => {
  console.error(error);
});
/* Defining the Apollo Server */
const apollo = new ApolloServer({
  playground: true,
  schema: mergeSchemas({
    schemas: [
      typeDef,
    ],
    resolvers: [
      resolver,
    ]
  }),
  subscriptions: {
    path: '/subscriptions',
  },
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  }),
  extensions
});

/* Applying apollo middleware to express server */
apollo.applyMiddleware({ app });

/*  Creating the server based on the environment */
const server = http.createServer(app);

// Installing the apollo ws subscription handlers
apollo.installSubscriptionHandlers(server);
// SummitGraphqlDemo
export default server.listen({ port: port }, () => {
  console.log(`Microservice running on ${process.env.NODE_ENV} at ${port}${apollo.graphqlPath}`);
});
