import { useEffect, useContext } from 'react'
import Notifier from '../../utils/Notifier'
import { UserContext } from '@renderer/contexts/User'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Slouch = ({ postureData, startPosition, slouchCount, setSlouchCount }: any): null => {
  const { postureStrictness, alertFrequency } = useContext(UserContext)

  useEffect(() => {
    if (postureData && startPosition) {
      const height: number =
        (startPosition.poseLandmarks[0].y - startPosition.poseLandmarks[12].y) *
        Number(postureStrictness)
      if (postureData.poseLandmarks[0].y > startPosition.poseLandmarks[0].y - height * 0.4) {
        setSlouchCount((currCount) => {
          return currCount + 1
        })
      }
      if (postureData.poseLandmarks[12].y > startPosition.poseLandmarks[12].y - height * 0.05) {
        setSlouchCount((currCount) => {
          return currCount + 1
        })
      }
      if (postureData.poseLandmarks[11].y > startPosition.poseLandmarks[11].y - height * 0.1) {
        setSlouchCount((currCount) => {
          return currCount + 1
        })
      } else {
        setSlouchCount((currCount) => {
          if (currCount >= 1) {
            return currCount - 1
          } else {
            return 0
          }
        })
      }
    }
  }, [postureData])

  useEffect(() => {
    console.log(slouchCount)
    if (slouchCount > alertFrequency) {
      setSlouchCount(0)
      Notifier('Posture Alert', 'Please sit up straight, you have been slouching')
    }
  }, [slouchCount])

  return null
}

export default Slouch
