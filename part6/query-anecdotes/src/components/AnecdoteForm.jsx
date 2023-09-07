import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = ({addAnecdote}) => {
  const notificationDispatch = useNotificationDispatch();

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdote.mutate({content, votes: 0});
    notificationDispatch({ message: `You added ${content}`, type: 'SHOW'})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
