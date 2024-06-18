import React from "react";
import { useState } from "react";
import { useApolloClient } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)

  if (!token) {
    const localToken = localStorage.getItem('library-user-token')
    if (localToken) {
      setToken(localToken)
    }
  }

  const loginHandle = (token) => {
    setToken(token)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
     <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token && <button onClick={() => setPage("add")}>add book</button>
        }
        {
          token && <button onClick={() => setPage("recommend")}>recommend</button>
        }
        {
          token && <button onClick={() => logout()}>logout</button>
        }
        {
          !token && <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommed"} />

      {
        !token && <Login show={page === 'login'} loginHandle={loginHandle} />
      }
    </div>
  );
};

export default App;