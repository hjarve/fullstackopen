import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  if (result.loading ) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => {
              setPage('authors')
              logout()
              }}>
              logout
            </button>
          </> 
          :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage}/>
    </div>
  )
}

export default App
