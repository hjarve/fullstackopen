import { useEffect, useState } from "react"
import { ALL_BOOKS, ME } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendations = ({show}) => {
  const [recommended, setRecommended] = useState([])
  const [favGenre, setFavGenre] = useState('')

  const userResult = useQuery(ME, {
    skip: !show,
  }) 

  const bookResult = useQuery(ALL_BOOKS, {
    skip: !show,
  })
  
  
  useEffect(() => {
    if ( bookResult.data && userResult.data ){
      setFavGenre(userResult.data.me.favoriteGenre)
      setRecommended(bookResult.data.allBooks.filter(book => book.genres.includes(userResult.data.me.favoriteGenre)))
    }
  }, [bookResult.data, userResult])

  if(!show){
    return null
  }

  if(bookResult.loading || userResult.loading) {
    return <div>loading...</div>
  }


  return(
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {favGenre} </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommended.map((a) => (
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

export default Recommendations