import { useDispatch } from "react-redux";
import { setNotification, removeNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    console.log(anecdote);
    event.target.anecdote.value = '';
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`You added ${anecdote}`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;