import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ReduxCache } from 'apollo-cache-redux';
import store from './store';

const httpLink = new HttpLink({uri: "http://localhost:4000/graphql"});
const cache = new ReduxCache(store);
const client = new ApolloClient({
    link: httpLink,
    cache
});

export default client;