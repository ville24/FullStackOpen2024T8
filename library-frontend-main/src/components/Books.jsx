import React from "react";
import { useState } from "react";
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS)

  const resultBooksByGenre = useQuery(ALL_BOOKS, { 
    variables: { genre: genre },
    skip: !genre,
    fetchPolicy: 'network-only'
  })

  if (result.loading || resultBooksByGenre.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genres = books.map(book => book.genres)
  const genresFlat = [].concat(...genres)
  const genresList = [...new Set(genresFlat)]

  const booksFiltered = (!resultBooksByGenre.loading && resultBooksByGenre.data) ? resultBooksByGenre.data.allBooks : books

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        {
          genre &&
            <span>in genre <b>{genre}</b></span>
        }
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            booksFiltered.map((a) => 
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
            )
          }
        </tbody>
      </table>
      <form onSubmit={submit}>
          {
            genresList.map(g =>
                <button key={g} value={g} onClick={({ target }) => setGenre(target.value)}>{g}</button>
            )
          }
          <button key="all genres" value={null} onClick={({ target }) => setGenre(target.value)}>all genres</button>
      </form>
    </div>
  )
}

export default Books
