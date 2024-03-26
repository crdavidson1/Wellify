import React from 'react'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Home from './components/Home';
import Header from './components/Header';
import PostureNotification from './components/PostureNotification';
import EmotionNotification from './components/EmotionNotification';
import NotifButton from './components/NotifButton';

const App: React.FC = () => {
  const [settings, setSettings] = useState('')
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home settings={settings}/>} />
        <Route path="/settings/" element={<Settings settings={settings} setSettings={setSettings}/>}/>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/notifications" element={<><PostureNotification/><EmotionNotification/><NotifButton/></>} />
      </Routes>
    </div>
  )
}

export default App
