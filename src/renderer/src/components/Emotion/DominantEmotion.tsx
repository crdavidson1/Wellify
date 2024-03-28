import { useState, useEffect } from "react";


const DominantEmotion = () => {
  const [dominantEmotion, setDominantEmotion] = useState("");
  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      setDominantEmotion(evt.detail.output.dominantEmotion || "") ;
    });
  }
  return (
    <div >
    <p style={{fontSize:"20px"}}>Dominant Emotion: {dominantEmotion}</p>
    </div>
  );
};

export default DominantEmotion;