import React from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Home from './components/Home';
import Header from './components/Header';
import PostureNotification from './components/PostureNotification';
import EmotionNotification from './components/EmotionNotification';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings/" element={<Settings />}/>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/notifications" element={<><PostureNotification/><EmotionNotification/></>} />
      </Routes>
    </div>
  )
}

export default App
