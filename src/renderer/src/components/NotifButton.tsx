const NotifButton: React.FC = () => {
  async function handleClick(): Promise<void> {
    const res = await window.wellifyAPI.check()
    console.log(res)

    Notification.requestPermission().then(() => {
      const NOTIFICATION_TITLE = 'Title'
      const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'

      new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    })
  }
  return (
    <div style={{ paddingLeft: '180px' }}>
      <button id="trigger" onClick={handleClick}>
        Trigger Notification
      </button>
    </div>
  )
}

export default NotifButton