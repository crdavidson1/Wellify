import React from 'react'
import { useRef } from 'react'
import PostureDetection from './PostureDetection'
import EmotionTracking from './EmotionTracking'

const Home: React.FC<any> = () => {
  const webcamRef = useRef<HTMLVideoElement>(null)
  return (
    <div
      style={{
        width: 'calc(100vw - 10rem)',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '11rem',
        paddingTop: '2rem'
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
        <PostureDetection webcamRef={webcamRef}/>
        <EmotionTracking webcamRef={webcamRef}/>
      </div>
    </div>
  )
}

export default Home
