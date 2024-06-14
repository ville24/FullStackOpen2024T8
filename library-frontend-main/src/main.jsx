import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  /*uri: 'http://localhost:4000',*/
  uri: 'https://didactic-train-wx6prvp5vp7c5569-4000.app.github.dev/',
  /*credentials: 'same-origin',*/
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
