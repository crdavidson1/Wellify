import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Home from './components/Home'
import About from './components/About'
import PostureNotification from './components/PostureNotification'
import EmotionNotification from './components/EmotionNotification'
import NotifButton from './components/NotifButton'
import Sidebar from './Sidebar'
import { UserProvider } from './contexts/User'
const App: React.FC = () => {
  return (
    <UserProvider>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          maxHeight: '100vh',
          maxWidth: '100vw'
        }}
      >
        <Sidebar />
        <div style={{ overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  )
}

export default App
