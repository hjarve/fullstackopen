import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';

function compareFn(a, b) {return b.votes - a.votes}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote( state, action) {
      const id = action.payload
      const newState = state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
      return newState.toSorted(compareFn);
    },
    appendAnecdote( state, action ) {
      state.push(action.payload);
    },
    setAnecdotes( state, action ) {
      const newState = action.payload;
      return newState.sort(compareFn);
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

export const updateVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(voteAnecdote(updatedAnecdote.id));
  }
}

export default anecdoteSlice.reducer;