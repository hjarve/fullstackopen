import { userNotificationValue } from "../NotificationContext"

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationMessage = userNotificationValue();

  return (
    <div style= {notificationMessage=== '' ? null: style}>
      {notificationMessage}
    </div>
  )
}

export default Notification
