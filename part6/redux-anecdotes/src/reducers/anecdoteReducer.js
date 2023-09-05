import { createSlice } from "@reduxjs/toolkit"

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
      state.push(action.payload);
    },
    setAnecdotes( state, action ) {
      return action.payload;
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;