const Notifier = (title: string, message: string): void => {
  Notification.requestPermission().then(() => {
    const NOTIFICATION_TITLE = title
    const NOTIFICATION_BODY = message

    new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  })
  return
}

export default Notifier
