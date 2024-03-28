import React from 'react'
import PostureDetection from './PostureDetection'
import EmotionTracking from './EmotionTracking'

const Home: React.FC<any> = () => {
  return (
    <div
      style={{
        width: 'calc(100vw - 10rem)',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10rem'
      }}
    >
      <div>
        <EmotionTracking/>
      </div>
    </div>
  )
}

export default Home
