import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@renderer/contexts/User'
import { Select, MenuItem, Button, Typography } from '@mui/material'

const Settings: React.FC = () => {
  const { modelComplexity, setModelComplexity } = useContext(UserContext)
  const { camera, setCamera } = useContext(UserContext)
  const { postureStrictness, setPostureStrictness } = useContext(UserContext)
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

  return (
    <div>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          textAlign: 'center',
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
        <br />
        <label>Camera: </label>
        <Select
          value={camera}
          onChange={handleCameraChange}
          style={{ minWidth: '150px' }}
          label="Camera" // Add label for accessibility
          id="camera" // Add id for labeling
        >
          {cameras.map((camera) => (
            <MenuItem key={camera} value={camera}>
              {camera}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={reloadCamera}>Refresh</Button>
        <br />
        <br />
        <label>Model Performance: </label>
        <Select
          value={modelComplexity}
          onChange={handleChange}
          style={{ minWidth: '150px' }}
          label="Model Performance" // Add label for accessibility
          id="model-performance" // Add id for labeling
        >
          {/* Replace option with MenuItem */}
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
        <label>Posture Strictness: </label>
        <Select
          value={postureStrictness}
          onChange={handlePostureChange}
          style={{ minWidth: '150px' }}
          label="Posture Strictness" // Add label for accessibility
          id="posture-strictness" // Add id for labeling
        >
          {/* Replace option with MenuItem */}
          <MenuItem value="1.5">Low</MenuItem>
          <MenuItem value="1">Medium</MenuItem>
          <MenuItem value="0.5">High</MenuItem>
        </Select>
      </div>
    </div>
  )
}

export default Settings
