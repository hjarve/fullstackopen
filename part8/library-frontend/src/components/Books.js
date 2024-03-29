import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"

const Books = (props) => {
  const [chosenGenre, setChosenGenre] = useState('all')
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [chosenBooks, setChosenBooks] = useState([])

  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
    variables: {genre: chosenGenre !== 'all' ? chosenGenre : null}
  })

  useEffect(() => {
    if ( result.data ){
      if (chosenGenre === 'all'){
        setBooks(result.data.allBooks)
        let genresArr = []
        result.data.allBooks.map(b => genresArr = genresArr.concat(b.genres))
        const genreSet = [...new Set(genresArr), 'all' ]
        setGenres(genreSet) 
      }
      setChosenBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      
      <h2>books</h2>

      <p>chosen genre: {chosenGenre}</p>
      <div>
        {genres.map((genre) => (<button style={chosenGenre === genre ? {color: 'red'} : null} key={genre} onClick={() => setChosenGenre(genre)}>{genre}</button>))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {chosenBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Books
