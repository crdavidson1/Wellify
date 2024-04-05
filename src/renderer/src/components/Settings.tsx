import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@renderer/contexts/User'
import { Select, MenuItem, Button, Typography } from '@mui/material'

const Settings: React.FC = () => {
  const { modelComplexity, setModelComplexity } = useContext(UserContext)
  const { camera, setCamera } = useContext(UserContext)
  const { postureStrictness, setPostureStrictness } = useContext(UserContext)
  const { userName, setUserName } = useContext(UserContext)
  const [loginError, setLoginError] = useState(false)
  const { alertFrequency, setAlertFrequency } = useContext(UserContext)
  const [cameras, setCameras] = useState<string[]>([])
  const [cameraRefresh, setCameraRefresh] = useState<boolean>()

  let cameraDevices: string[] = []
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      cameraDevices = []
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          cameraDevices.push(device.label)
        }
      })
      setCameras(cameraDevices)
      if (!camera) {
        setCamera(cameraDevices[0])
      }
      setCameraRefresh(false)
    })
  }, [cameraRefresh])
  function reloadCamera(): void {
    setCameraRefresh(true)
  }
  if (!cameraDevices) {
    return <p>Please connect a camera device</p>
  }
  function handleChange(event): void {
    setModelComplexity(Number(event.target.value))
    localStorage.setItem('modelComplexity', JSON.stringify(event.target.value))
  }

  function handleCameraChange(event): void {
    setCamera(event.target.value)
    localStorage.setItem('camera', JSON.stringify(event.target.value))
  }

  function handlePostureChange(event): void {
    setPostureStrictness(event.target.value)
    localStorage.setItem('postureStrictness', JSON.stringify(event.target.value))
  }

  async function handleSubmit(e): Promise<void> {
    e.preventDefault()

    const loggedIn = await window.wellifyAPI.login(e.target[0].value, e.target[1].value)
    console.log(loggedIn)

    if (!loggedIn) {
      setUserName('')
      setLoginError(true)
    } else {
      setUserName(e.target[0].value)
      setLoginError(false)
    }
    function handleAlertFrequency(event): void {
      setAlertFrequency(event.target.value)
      localStorage.setItem('alertFrequency', JSON.stringify(event.target.value))
    }

    return (
      <div>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: 'left',
            paddingLeft: '5%',
            marginTop: '20px',
            fontWeight: 'bold',
            color: 'black',
            fontSize: '1.7rem'
          }}
        >
          Settings
        </Typography>
        <div
          style={{
            justifyContent: 'center',
            paddingLeft: '5%',
            paddingTop: '5%',
            width: '90%'
          }}
        >
          {userName === '' ? 'Not logged in' : `Logged in as ${userName}`}
          <br />
          <label>User</label>
          <form onSubmit={handleSubmit}>
            <input placeholder={'username'} style={{ minWidth: '150px' }} type="text" />
            <input placeholder={'password'} style={{ minWidth: '150px' }} type="text" />
            <button>Log In</button>
          </form>
          <br />
          <label style={{ paddingRight: '10px' }}>Model Performance: </label>
          <Select
            value={modelComplexity}
            onChange={handleChange}
            style={{ minWidth: '150px' }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem key="0" value={0}>
              Lite
            </MenuItem>
            <MenuItem key="1" value={1}>
              Full
            </MenuItem>
            <MenuItem key="2" value={2}>
              Heavy
            </MenuItem>
          </Select>
          <br />
          <br />
          <label style={{ paddingRight: '25px' }}>Posture Strictness:</label>
          <Select
            value={postureStrictness}
            onChange={handlePostureChange}
            style={{ minWidth: '150px' }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="1.5">Low</MenuItem>
            <MenuItem value="1">Medium</MenuItem>
            <MenuItem value="0.5">High</MenuItem>
          </Select>
          <br />
          <br />
          <label style={{ paddingRight: '35px' }}>Alert Frequency:</label>
          <Select
            value={alertFrequency}
            onChange={handleAlertFrequency}
            style={{ minWidth: '150px' }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="2000">Low</MenuItem>
            <MenuItem value="1000">Medium</MenuItem>
            <MenuItem value="500">High</MenuItem>
            <MenuItem value="100">Irritating</MenuItem>
          </Select>
        </div>
      </div>
    )
  }
}

export default Settings
