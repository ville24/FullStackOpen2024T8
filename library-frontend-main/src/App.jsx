import React from "react"
import { useState } from "react"
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS } from "./queries.js"

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  try {
    cache.updateQuery(query, ({ allBooks }) => {
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      }
    })
  }
  catch(err) {}
}

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

  useSubscription(BOOK_ADDED, {
    onData: async ({ data }) => {
      alert('book added: ' + data.data.bookAdded.title)
      await client.refetchQueries({ include: [ALL_AUTHORS] })
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      addedBook.genres.map(genre => {
        updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: genre } }, addedBook)
      })
    }
  })

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

      {
        token && <Recommend show={page === "recommend"} />
      }
      {
        !token && <Login show={page === 'login'} loginHandle={loginHandle} />
      }
    </div>
  );
};

export default App;