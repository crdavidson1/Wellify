import React from 'react'
import { useEffect } from 'react'
import { useExternalScript } from './Emotion/externalScriptsLoader'
import { getAiSdkControls } from './Emotion/loader'
import DominantEmotion from './Emotion/DominantEmotion'

const EmotionTracking: React.FC<any> = ({ webcamRef }) => {
  const mphToolsState = useExternalScript('https://sdk.morphcast.com/mphtools/v1.0/mphtools.js')
  const aiSdkState = useExternalScript('https://ai-sdk.morphcast.com/v1.16/ai-sdk.js')

  useEffect(() => {
    webcamRef = document.getElementById('webcamRef')
    async function getAiSdk() {
      if (aiSdkState === 'ready' && mphToolsState === 'ready') {
        const { source, start } = await getAiSdkControls()
        await source.useCamera({
          toVideoElement: document.getElementById('webcamRef')
        })
        await start()
      }
    }
    getAiSdk()
  }, [aiSdkState, mphToolsState])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DominantEmotion />
    </div>
  )
}

export default EmotionTracking
