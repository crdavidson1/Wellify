import React from 'react';
import { useState, useEffect } from "react";

const Settings: React.FC<any> = ({settings, setSettings}) => {
    const [cameras, setCameras] = useState<string[]>([])
    const [cameraRefresh, setCameraRefresh] = useState<boolean>()
    let cameraDevices: string[] = []
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices)=>{
            devices.forEach((device)=>{
                if (device.kind === 'videoinput') {
                    cameraDevices.push(device.label)
                }})
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
        setSettings(event.target.value)
    }
    return (
        <div>
            <br></br>
            <label>Camera: </label>
            <select name='Model Performance' id='model-performance'>
                {cameras.map((camera)=>{
                    return <option>{camera}</option>
                })}
            </select>
            <button onClick={reloadCamera}>Refresh</button>
            <br></br>
            <br></br>
            <label>Model Performance: </label>
            <select value={settings} onChange={handleChange} id='model-performance'>
                <option value='0'>Lite</option>
                <option value='1'>Full</option>
                <option value='2'>Heavy</option>
            </select>
            <br></br>
            <br></br>
            <label>Posture Strictness: </label>
            <select name='Posture Strictness' id='posture-strictness'>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
        </div>
    )
}

export default Settings