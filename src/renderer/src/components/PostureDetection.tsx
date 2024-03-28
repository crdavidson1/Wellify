import React, { useContext } from 'react'
import * as pose from '@mediapipe/pose'
import * as cam from '@mediapipe/camera_utils'
import * as drawingUtils from '@mediapipe/drawing_utils'
import Button from '@mui/material/Button'
import { useRef, useEffect, useState } from 'react'
import Slouch from './Posture/Slouch'
import LookAway from './Posture/LookAway'
import { UserContext } from '@renderer/contexts/User'
import EyeDistance from './Posture/EyeDistance'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostureDetection: React.FC<any> = ({ webcamRef }) => {
  const { modelComplexity } = useContext(UserContext)
  // const webcamRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // a 'union type' variable. Can either be of type cam.Camera or null. Initialise to a value of null.
  let camera: cam.Camera | null = null

  const [postureData, setPostureData] = useState(null)
  const [startPosition, setStartPosition] = useState(null)
  const [sessionRunning, setSessionRunning] = useState(false)
  const [slouchCount, setSlouchCount] = useState(0)
  const [notLookedAwayCount, setNotLookedAwayCount] = useState(0)
  const [tooCloseCount, setTooCloseCount] = useState(0)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onResults(results: any): void {
    if (isLoading) {
      setIsLoading(false)
    }
    setPostureData(results)
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const canvasCtx = canvasElement.getContext('2d')
    if (!canvasCtx) return

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

    if (results.poseLandmarks) {
      drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
        visibilityMin: 0.65,
        color: 'white'
      })
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(pose.POSE_LANDMARKS_LEFT).map((index) => results.poseLandmarks[index]),
        { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' }
      )
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(pose.POSE_LANDMARKS_RIGHT).map((index) => results.poseLandmarks[index]),
        { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' }
      )
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(pose.POSE_LANDMARKS_NEUTRAL).map((index) => results.poseLandmarks[index]),
        { visibilityMin: 0.65, color: 'white', fillColor: 'white' }
      )
    }
    canvasCtx.restore()
  }
  useEffect(() => {
    if (!hasLoaded) {
      const mpPose = new pose.Pose({
        locateFile: (file): string => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        }
      })
      mpPose.setOptions({
        selfieMode: true,
        modelComplexity: 2,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      })

      if (webcamRef.current && canvasRef.current) {
        camera = new cam.Camera(webcamRef.current, {
          onFrame: async (): Promise<void> => {
            const canvasElement = canvasRef.current
            const width = 640
            const height = 480
            if (canvasElement) {
              canvasElement.width = width
              canvasElement.height = height
            }
            if (webcamRef.current) {
              await mpPose.send({ image: webcamRef.current })
            }
          }
        })

        camera
          .start()
          .then(() => {
            setHasLoaded(false)
          })
          .catch((error) => {
            console.error('Camera error:', error)
          })
        mpPose.onResults(onResults)
      }
    }
    return (): void => {
      camera?.stop()
    }
  }, [hasLoaded])

  const handleClick = (): void => {
    if (!sessionRunning) {
      console.log('session started')
      setStartPosition(postureData)
      setSessionRunning(true)
    } else {
      setSessionRunning(false)
      setStartPosition(null)
      setSlouchCount(0)
      setNotLookedAwayCount(0)
      console.log('session stopped')
      camera?.stop()
    }
  }
  return (
    <>
      <div style={{ width: '640px', height: '480px', position: 'relative' }}>
        {isLoading ? (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(173, 216, 230, 0.5)'
            }}
          >
            <h2 style={{ color: '#fff' }}>Loading...</h2>
          </div>
        ) : null}
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
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 50,
            width: '640px',
            height: '480px',
            display: isLoading ? 'none' : 'block' // Make sure the canvas is displayed when loading is done
          }}
        />
      </div>

    {isLoading ? null : (
      <Button
        variant="contained"
        style={{
          position: 'absolute',
          marginTop: '15px',
          marginLeft: '250px'
        }}
        sx={{
          bgcolor: '#0064C5',
          '&:hover': {
            bgcolor: '#89c9fb'
          }
        }}
        onClick={() => {
          handleClick()
        }}
      >
        {sessionRunning ? 'Stop Session' : 'Start Session'}
      </Button>
      )}

      <Slouch
        postureData={postureData}
        startPosition={startPosition}
        slouchCount={slouchCount}
        setSlouchCount={setSlouchCount}
      />
      <LookAway
        postureData={postureData}
        startPosition={startPosition}
        notLookedAwayCount={notLookedAwayCount}
        setNotLookedAwayCount={setNotLookedAwayCount}
      />
      <EyeDistance
        postureData={postureData}
        startPosition={startPosition}
        tooCloseCount={tooCloseCount}
        setTooCloseCount={setTooCloseCount}
      />
    </>
  )
}

export default PostureDetection
