import React, { useContext } from 'react'
import * as pose from '@mediapipe/pose'
import * as cam from '@mediapipe/camera_utils'
import * as drawingUtils from '@mediapipe/drawing_utils'
import Button from '@mui/material/Button'
import { useRef, useEffect, useState } from 'react'
import Slouch from './Posture/Slouch'
import LookAway from './Posture/LookAway'
import EyeDistance from './Posture/EyeDistance'
import { CircularProgress, Typography } from '@mui/material'
import { UserContext } from '@renderer/contexts/User'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostureDetection: React.FC<any> = ({ webcamRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let camera: cam.Camera | null = null
  const { modelComplexity } = useContext(UserContext)

  const [postureData, setPostureData] = useState(null)
  const [startPosition, setStartPosition] = useState(null)
  const [sessionRunning, setSessionRunning] = useState(false)
  const [slouchCount, setSlouchCount] = useState(0)
  const [notLookedAwayCount, setNotLookedAwayCount] = useState(0)
  const [tooCloseCount, setTooCloseCount] = useState(0)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionStarting, setSessionStarting] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onResults(results: any): void {
    if (isLoading) {
      setIsLoading(false)
    }
    setPostureData(results)
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const canvasCtx = canvasElement.getContext('2d', { willReadFrequently: true })
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
        { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,100,197)' }
      )
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(pose.POSE_LANDMARKS_RIGHT).map((index) => results.poseLandmarks[index]),
        { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(137,201,251)' }
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
        modelComplexity: modelComplexity,
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
      setSessionStarting(true)
      setSessionRunning(true)
      setTimeout(() => {
        console.log('session started')
        setStartPosition(postureData)
        setSessionStarting(false)
      }, 3000)
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
              backgroundColor: 'rgba(0, 100, 197, 0.7)'
            }}
          >
            <CircularProgress size={80} sx={{ color: '#89c9fb' }} />
          </div>
        ) : null}
        {sessionStarting ? (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 50,
              backgroundColor: 'rgba(0, 100, 197, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'white',
                fontSize: '1.7rem',
                fontWeight: 'bolder',
                textAlign: 'center',
                marginBottom: 4
              }}
            >
              Please make sure to sit up straight...
            </Typography>
            <CircularProgress size={80} sx={{ color: '#89c9fb' }} />
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
            zIndex: 10,
            transform: 'scaleX(-1)'
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 20,
            width: '640px',
            height: '480px',
            display: isLoading ? 'none' : 'block'
          }}
        />
      </div>

      {isLoading ? null : (
        <Button
          variant="contained"
          style={{
            position: 'absolute',
            marginTop: '55px',
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
