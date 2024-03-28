import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Home from './components/Home'
import PostureNotification from './components/PostureNotification'
import EmotionNotification from './components/EmotionNotification'
import NotifButton from './components/NotifButton'
import Sidebar from './Sidebar'
import { UserProvider } from './contexts/User'

const App: React.FC = () => {
  return (
    <UserProvider>
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '20rem', minWidth: '20rem' }}
    >
      <Sidebar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route
            path="/notifications"
            element={
              <>
                <PostureNotification />
                <EmotionNotification />
                <NotifButton />
              </>
            }
          />
        </Routes>
      </div>
    </div>
    </UserProvider>
  )
}

export default App
