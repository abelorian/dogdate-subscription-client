import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
})

const auth_token = ["QW2aNu7iEr8CyQSn_HbbNLsoUZsBrisgKuZ3oeMgzjJswQxXbA", "f-EXUW5pCnc8Ymi-7YZn-Cx-BTTvFZFSQZCmQm_9Hs5GTVzDRQ"][0]
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription',
  )
}

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      Authorization: auth_token
    }
  };
});

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  httpLink
)
const client = new ApolloClient({
  link: authLink.concat(link),
  fetchOptions: {
    credentials: 'include'
  },
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
