import React from 'react';
import { useEffect, useRef } from "react";
import { useExternalScript } from "./Emotion/externalScriptsLoader";
import { getAiSdkControls } from "./Emotion/loader";
import EngagementComponent from './Emotion/Engagement';
import DominantEmotion from './Emotion/DominantEmotion';
import FaceTrackerComponent from './Emotion/FaceTracker';
import MoodComponent from './Emotion/Mood';
import EmotionBarsComponent from './Emotion/EmotionBars';

const EmotionTracking: React.FC<any> = ({webcamRef}) => {
 const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  const videoEl = useRef(undefined)

  useEffect(() => {
    videoEl.current = document.getElementById("webcamRef");
    console.log(document.getElementById('webcamRef'))
    console.log(webcamRef)
    async function getAiSdk (){
      if(aiSdkState === "ready" && mphToolsState === "ready"){
        const { source, start } = await getAiSdkControls();
      await source.useCamera({
        toVideoElement: document.getElementById("videoEl"),
      });
        await start();
        
      }
     
    }
    getAiSdk();
  }, [aiSdkState, mphToolsState]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>  
            <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
          <DominantEmotion></DominantEmotion>
        </div>
      </header>
    </div>
  );
}

export default EmotionTracking