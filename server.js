import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './server/graphql/schema';
import resolvers from './server/graphql/resolvers';
import mongoose from 'mongoose';

const schema = makeExecutableSchema({
    typeDefs,
	resolvers
});

const PORT = 4000;

const app = express();

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

app.listen(PORT, () => {
    console.log('App running on 4000');
});