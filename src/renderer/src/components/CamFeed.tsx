import Webcam from 'react-webcam'
import React from 'react'
const CamFeed: React.FC = () => {
  return (
    <Webcam
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9,
        width: 1200,
        height: 800
      }}
    />
  )
}

export default CamFeed
