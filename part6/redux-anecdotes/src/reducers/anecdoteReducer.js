import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote( state, action) {
      const id = action.payload
      const newState = state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
      function compareFn(a, b) {return b.votes - a.votes}
      return newState.toSorted(compareFn);
    },
    addAnecdote( state, action ) {
      const newAnecdote = asObject(action.payload);
      return state.concat(newAnecdote); 
    },
    setAnecdotes( state, action ) {
      return action.payload;
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;