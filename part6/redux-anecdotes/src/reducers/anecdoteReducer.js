import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';

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
    appendAnecdote( state, action ) {
      state.push(action.payload);
    },
    setAnecdotes( state, action ) {
      return action.payload;
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export default anecdoteSlice.reducer;