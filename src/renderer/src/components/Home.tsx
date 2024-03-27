import React from 'react'
import PostureDetection from './PostureDetection'

const Home: React.FC<any> = ({ settings }) => {
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
        <PostureDetection settings={settings} />
      </div>
    </div>
  )
}

export default Home
