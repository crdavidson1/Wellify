import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@renderer/contexts/User'
import { Select, MenuItem, Button, Typography } from '@mui/material'

const Settings: React.FC = () => {
  const { modelComplexity, setModelComplexity } = useContext(UserContext)
  const [cameras, setCameras] = useState<string[]>([])
  const [cameraRefresh, setCameraRefresh] = useState<boolean>()
  const [camera, setCamera] = useState<string[]>([])
  const [postureStrictness, setPostureStrictness] = useState<string[]>([])

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
  }

  function handleCameraChange(event): void {
    setCamera(event.target.value)
  }

  function handlePostureChange(event): void {
    setPostureStrictness(event.target.value)
  }
  // return (
  //   <div style={{ paddingLeft: '180px' }}>
  //     <br></br>
  //     <label>Camera: </label>
  //     <select name="Model Performance" id="model-performance">
  //       {cameras.map((camera) => {
  //         return <option key={camera}>{camera}</option>
  //       })}
  //     </select>
  //     <button onClick={reloadCamera}>Refresh</button>
  //     <br></br>
  //     <br></br>
  //     <label>Model Performance: </label>
  //     <select value={modelComplexity} onChange={handleChange} id="model-performance">
  //       <option key="0" value="0">
  //         Lite
  //       </option>
  //       <option key="1" value="1">
  //         Full
  //       </option>
  //       <option key="2" value="2">
  //         Heavy
  //       </option>
  //     </select>
  //     <br></br>
  //     <br></br>
  //     <label>Posture Strictness: </label>
  //     <select name="Posture Strictness" id="posture-strictness">
  //       <option>Low</option>
  //       <option>Medium</option>
  //       <option>High</option>
  //     </select>
  //   </div>
  // )

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
      <div style={{ paddingLeft: '15rem' }}>
        <br />
        <label>Camera: </label>
        {/* Replace select with Select */}
        <Select
          value={camera}
          onChange={handleCameraChange}
          style={{ minWidth: '150px' }}
          label="Camera" // Add label for accessibility
          id="camera" // Add id for labeling
        >
          {/* Replace option with MenuItem */}
          {cameras.map((camera) => (
            <MenuItem key={camera} value={camera}>
              {camera}
            </MenuItem>
          ))}
        </Select>
        {/* Replace button with Button */}
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
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </div>
    </div>
  )
}

export default Settings
