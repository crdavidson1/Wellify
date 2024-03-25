import BlazePose from './components/PostureDetection'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Home from './components/Home';
import Header from './components/Header';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings/" element={<Settings />}/>
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <BlazePose />
    </div>
  )
}

export default App
