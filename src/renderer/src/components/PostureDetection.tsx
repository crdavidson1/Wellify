import React from 'react'
import * as pose from '@mediapipe/pose'
import smoothLandmarks from 'mediapipe-pose-smooth' // ES6
import * as cam from '@mediapipe/camera_utils'
import * as drawingUtils from '@mediapipe/drawing_utils'
import { useRef, useEffect, useState } from 'react'

const BlazePose: React.FC = () => {
  const webcamRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let camera: cam.Camera | null = null
  const [didLoad, setdidLoad] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onResults(results: any): void {
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
    if (!didLoad) {
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
            const aspect = window.innerHeight / window.innerWidth
            let width, height
            if (window.innerWidth > window.innerHeight) {
              height = window.innerHeight
              width = height / aspect
            } else {
              width = window.innerWidth
              height = width * aspect
            }
            if (canvasElement) {
              canvasElement.width = width
              canvasElement.height = height
            }
            if (webcamRef.current) {
              await mpPose.send({ image: webcamRef.current })
            }
          }
        })
        camera.start()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mpPose.onResults(onResults)
        setdidLoad(true)
      }
    }
    return (): void => {
      camera?.stop()
    }
  }, [didLoad])

  return (
    <div style={{ position: 'relative' }}>
      <video ref={webcamRef} style={{ width: '640px', height: '480px' }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 50 }}
      />
    </div>
  )
}

export default BlazePose
