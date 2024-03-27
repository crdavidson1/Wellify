import Notifier from '../../utils/Notifier'

const Slouch = ({ postureData, startPosition, slouchCount, setSlouchCount }: any): void => {
  if (postureData && startPosition) {
    const height: number = startPosition.poseLandmarks[0].y - startPosition.poseLandmarks[12].y

    if (postureData.poseLandmarks[0].y > startPosition.poseLandmarks[0].y - height * 0.2) {
      setSlouchCount((currCount) => {
        return currCount + 1
      })
    }
    if (postureData.poseLandmarks[12].y > startPosition.poseLandmarks[12].y - height * 0.1) {
      setSlouchCount((currCount) => {
        return currCount + 1
      })
    }
    if (postureData.poseLandmarks[11].y > startPosition.poseLandmarks[11].y - height * 0.1) {
      setSlouchCount((currCount) => {
        return currCount + 1
      })
    }
  }
  if (slouchCount > 10000) {
    setSlouchCount(0)
    Notifier('Posture Alert', 'Please sit up straight, you have been slouching')
  }
  return
}

export default Slouch
