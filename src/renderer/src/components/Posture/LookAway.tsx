import { useEffect } from 'react'
import Notifier from '../../utils/Notifier'

const LookAway = ({
  postureData,
  startPosition,
  notLookedAwayCount,
  setNotLookedAwayCount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any): null => {
  if (postureData && startPosition) {
    const width: number = startPosition.poseLandmarks[7].x - startPosition.poseLandmarks[0].x
    const height: number = startPosition.poseLandmarks[5].y - startPosition.poseLandmarks[10].y
    useEffect(() => {
      if (postureData.poseLandmarks[0].x - postureData.poseLandmarks[8].x < width * 0.8) {
        setNotLookedAwayCount((currCount) => {
          if (currCount >= 10) {
            return currCount - 10
          } else {
            return 0
          }
        })
      }
      if (postureData.poseLandmarks[0].x - postureData.poseLandmarks[8].x > width * 1.2) {
        setNotLookedAwayCount((currCount) => {
          if (currCount >= 10) {
            return currCount - 10
          } else {
            return 0
          }
        })
      }
      if (postureData.poseLandmarks[0].y < startPosition.poseLandmarks[0].y + height * 0.2) {
        setNotLookedAwayCount((currCount) => {
          if (currCount >= 10) {
            return currCount - 10
          } else {
            return 0
          }
        })
      } else {
        setNotLookedAwayCount((currCount) => {
          return currCount + 1
        })
      }
    }, [postureData])
  }
  if (notLookedAwayCount > 300) {
    setNotLookedAwayCount(0)
    Notifier('Eye Health Alert', 'Please take a moment to look away from your screen')
  }
  return null
}

export default LookAway
