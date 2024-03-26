import React from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Home from './components/Home';
import Header from './components/Header';
import PostureNotification from './components/PostureNotification';
import EmotionNotification from './components/EmotionNotification';
import NotifButton from './components/NotifButton';
import Sidebar from './Sidebar';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />}/>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/notifications" element={<><PostureNotification/><EmotionNotification/><NotifButton/></>} />
      </Routes>
    </div>
  )
}

export default App
