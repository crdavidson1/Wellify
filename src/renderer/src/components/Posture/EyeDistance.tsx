import { useContext, useEffect } from 'react'
import Notifier from '../../utils/Notifier'
import { UserContext } from '@renderer/contexts/User'

const EyeDistance = ({
  postureData,
  startPosition,
  tooCloseCount,
  setTooCloseCount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any): null => {
  const { postureStrictness } = useContext(UserContext)
  if (postureData && startPosition) {
    useEffect(() => {
      if (
        postureData.poseLandmarks[0].z <
        startPosition.poseLandmarks[0].z * (1 + Number(postureStrictness) / 10)
      ) {
        setTooCloseCount((currCount) => {
          return currCount + 2
        })
      } else {
        setTooCloseCount((currCount) => {
          if (currCount >= 1) {
            return currCount - 1
          } else {
            return 0
          }
        })
      }
    }, [postureData])
  }
  if (tooCloseCount > 100) {
    setTooCloseCount(0)
    Notifier('Eye Health Alert', 'Please move face further away from screen')
  }
  return null
}

export default EyeDistance
