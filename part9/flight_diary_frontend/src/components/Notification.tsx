interface NotificationProps {
  message: string;
}

const Notification = ({message}: NotificationProps) => {
  return(
    <div style={{color: 'red'}}>{message}</div>
  )
}

export default Notification;