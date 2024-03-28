const NotifButton: React.FC = () => {
  async function handleClick(): Promise<void> {
    const res = await window.wellifyAPI.loki()
    console.log(res);

    const res2 = await window.wellifyAPI.checkAPI('alex diamond')
    console.log(res2);
    

    Notification.requestPermission().then(() => {
      const NOTIFICATION_TITLE = 'Title'
      const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'

      new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    })
  }
  return (
    <div style={{paddingLeft: '180px'}}>
    <button id="trigger" onClick={handleClick}>
      Trigger Notification
    </button>
    </div>

  )
}

export default NotifButton
