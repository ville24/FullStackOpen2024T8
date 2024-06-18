import React from "react";
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const me = useQuery(ME)
  const result = useQuery(ALL_BOOKS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const booksFiltered = books.filter((b) => b.genres.find(g => g === me.genre))

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <div>books in your favorite genre <b>{genre}</b></div>

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
    </div>
  )
}

export default Recommend
