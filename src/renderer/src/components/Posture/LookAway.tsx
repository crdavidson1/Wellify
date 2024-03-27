import Notifier from '../../utils/Notifier'

const LookAway = ({
  postureData,
  startPosition,
  notLookedAwayCount,
  setNotLookedAwayCount
}: any): void => {
  if (postureData && startPosition) {
  }
  //     const width: number = startPosition.poseLandmarks[0].y - startPosition.poseLandmarks[12].y

  //     if (postureData.poseLandmarks[0].y > startPosition.poseLandmarks[0].y - height * 0.2) {
  //       setSlouchCount((currCount) => {
  //         return currCount + 1
  //       })
  //     }
  //     if (postureData.poseLandmarks[12].y > startPosition.poseLandmarks[12].y - height * 0.1) {
  //       setSlouchCount((currCount) => {
  //         return currCount + 1
  //       })
  //     }
  //     if (postureData.poseLandmarks[11].y > startPosition.poseLandmarks[11].y - height * 0.1) {
  //       setSlouchCount((currCount) => {
  //         return currCount + 1
  //       })
  //     }
  //   }
  //   console.log(slouchCount)
  //   if (slouchCount > 10000) {
  //     console.log('oi oi oi oi ')
  //     setSlouchCount(0)
  //     Notifier('Posture Alert', 'Please sit up straight, you have been slouching')
  //   }
  return
}

export default LookAway
