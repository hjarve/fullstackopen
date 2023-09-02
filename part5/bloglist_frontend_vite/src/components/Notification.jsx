const Notification = ({ message, successful }) => {
  if (message === null){
    return null;
  }
  const successfulStyle = {
    color: 'green',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorStyle = {
    color: 'red',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return(
    <div className='notification' style={successful ? successfulStyle : errorStyle}>
      {message}
    </div>
  )
}

export default Notification;