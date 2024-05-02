import React from 'react'
import { useRef, useEffect, useState } from 'react'
import PostureDetection from './PostureDetection'
import EmotionTracking from './EmotionTracking'
import { getCustomers, getEvents } from '../api.js'

const Home: React.FC<any> = () => {
  const webcamRef = useRef<HTMLVideoElement>(null)
  async function getActiveWindow() {
    const res = await window.wellifyAPI.getWindow()
    return res
  }
  getActiveWindow()
  const [customers, setCustomers] = useState({})
  const [events, setEvents] = useState({})
  useEffect(() => {
    getCustomers().then((response) => {
      setCustomers(response.data.customers)
    })
    getEvents().then((response) => {
      setEvents(response.data.events)
    })
  }, [])
  console.log(customers)
  console.log(events)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '5%',
        paddingTop: '5%',
        width: '90%'
      }}
    >
      <div>
        <video
          ref={webcamRef}
          muted
          autoPlay
          playsInline
          style={{
            position: 'absolute',
            width: '640px',
            height: '480px',
            zIndex: 10, // Ensure the video is under the canvas
            transform: 'scaleX(-1)' // Flip the video horizontally
          }}
        />
        <PostureDetection webcamRef={webcamRef} />
        <EmotionTracking webcamRef={webcamRef} />
      </div>
    </div>
  )
}

export default Home
