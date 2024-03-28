import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@renderer/contexts/User'

const Settings: React.FC = () => {
    const { modelComplexity, setModelComplexity } = useContext(UserContext)
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
    return (
    <div style={{paddingLeft: '180px'}}>
        <br></br>
        <label>Camera: </label>
        <select name="Model Performance" id="model-performance">
        {cameras.map((camera) => {
          console.log(cameras)
            return <option key={camera}>{camera}</option>
        })}
        </select>
        <button onClick={reloadCamera}>Refresh</button>
        <br></br>
        <br></br>
        <label>Model Performance: </label>
        <select value={modelComplexity} onChange={handleChange} id="model-performance">
          <option key='0' value="0">Lite</option>
          <option key='1' value="1">Full</option>
          <option key='2' value="2">Heavy</option>
        </select>
        <br></br>
        <br></br>
        <label>Posture Strictness: </label>
        <select name="Posture Strictness" id="posture-strictness">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
    </div>
  )
}

export default Settings
