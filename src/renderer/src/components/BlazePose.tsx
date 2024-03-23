import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import '@mediapipe/pose'
import * as poseDetection from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'

const BlazePose: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null)

  useEffect(() => {
    async function createDetector() {
      const model = poseDetection.SupportedModels.BlazePose
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
      }
      detectorRef.current = await poseDetection.createDetector(model, detectorConfig)
    }
    createDetector()
  }, [])

  useEffect(() => {
    const detectPose = async () => {
      if (detectorRef.current && webcamRef.current && webcamRef.current.video) {
        const videoElement = webcamRef.current.video

        if (videoElement.readyState >= 2) {
          try {
            const poses = await detectorRef.current.estimatePoses(videoElement)
            // Draw the poses
            drawPoses(poses)
          } catch (error) {
            console.error(error)
          }
        }
      }
      requestAnimationFrame(detectPose)
    }

    detectPose()
  }, [])

  const drawPoses = (poses) => {
    console.log(poses)
    const canvas = canvasRef.current
    const video = webcamRef.current.video

    if (canvas && video) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        poses.forEach((pose) => {
          console.log(pose)
          drawConnectors(
            ctx,
            pose.keypoints,
            poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.BlazePose),
            { color: '#00FF00', lineWidth: 4 }
          )
          drawLandmarks(ctx, pose.keypoints, { color: '#FF0000', lineWidth: 2 })
        })
      }
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <Webcam ref={webcamRef} style={{ width: '640px', height: '480px' }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 50 }}
      />
    </div>
  )
}

export default BlazePose
