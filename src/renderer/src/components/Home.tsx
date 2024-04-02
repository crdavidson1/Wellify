import React from 'react'
import { useRef } from 'react'
import PostureDetection from './PostureDetection'
import EmotionTracking from './EmotionTracking'


const Home: React.FC<any> = () => {
  const webcamRef = useRef<HTMLVideoElement>(null)
  async function getActiveWindow() {
    const res = await window.wellifyAPI.getWindow()
    console.log(res)
    return res
  }
  getActiveWindow()
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
