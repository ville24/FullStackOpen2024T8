import React from "react";
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {

  const resultMe = useQuery(ME, {
    skip: !props.show
  })

  const genre = (!resultMe.loading && resultMe.data && resultMe.data.me) ? resultMe.data.me.favoriteGenre : null

  const resultBooks = useQuery(ALL_BOOKS, { 
    variables: { genre: genre },
    skip: !genre
  })

  if (resultMe.loading || resultBooks.loading)  {
    return <div>loading...</div>
  }
  
  const booksFiltered = (!resultBooks.loading && resultBooks.data) ? resultBooks.data.allBooks : []

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
