import React from 'react';
import { useEffect, useRef } from "react";
import { useExternalScript } from "./Emotion/externalScriptsLoader";
import { getAiSdkControls } from "./Emotion/loader";
import EngagementComponent from './Emotion/Engagement';
import DominantEmotion from './Emotion/DominantEmotion';
import FaceTrackerComponent from './Emotion/FaceTracker';
import MoodComponent from './Emotion/Mood';
import EmotionBarsComponent from './Emotion/EmotionBars';

const EmotionTracking: React.FC = () => {
 const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  const videoEl = useRef(undefined)

  useEffect(() => {
    videoEl.current = document.getElementById("videoEl");
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
          <div style={{width:"640px", height: "480px", position:"relative"}}>
            <video id="videoEl"></video>
            <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
          </div>
          <DominantEmotion></DominantEmotion>
          <hr className="solid" style={{width:"100%"}}></hr>
        </div>
      </header>
    </div>
  );
}

export default EmotionTracking