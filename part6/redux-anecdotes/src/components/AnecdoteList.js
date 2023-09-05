import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )

}

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    if(filter === '') return anecdotes;
    return anecdotes.filter(anecdote => anecdote.content.includes(filter));
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted ${anecdote.content}`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key = {anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)}/>
      )}
    </div>
  )
}

export default AnecdoteList;