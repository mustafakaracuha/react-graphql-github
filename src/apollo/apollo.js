import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export default client;  