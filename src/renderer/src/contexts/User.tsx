import React, { createContext, useState } from 'react'

interface Event {
  user_id: number
  event_type: string
  event_time: number
  active_program: string
}

export const UserContext = createContext<{
  modelComplexity: 0 | 2 | 1
  setModelComplexity: (newValue: any) => void
  camera: string
  setCamera: (newValue: string) => void
  postureStrictness: string
  setPostureStrictness: (newValue: string) => void
  userName: string
  setUserName: (newUsername: string) => void
  alertFrequency: string
  setAlertFrequency: (newValue: string) => void
  users: Array<object>
  setUsers: (newValue: any) => void
  events: Array<object>
  setEvents: (newValue: any) => void
  userPostureEvents: Event[]
  setUserPostureEvents: (newValue: any) => void
  userEmotionEvents: Event[]
  setUserEmotionEvents: (newValue: any) => void
}>({
  modelComplexity: 2,
  setModelComplexity: () => undefined,
  camera: '',
  setCamera: () => undefined,
  postureStrictness: '',
  setPostureStrictness: () => undefined,
  userName: '',
  setUserName: () => undefined,
  alertFrequency: '',
  setAlertFrequency: () => undefined,
  users: [],
  setUsers: () => undefined,
  events: [],
  setEvents: () => undefined,
  userPostureEvents: [],
  setUserPostureEvents: () => undefined,
  userEmotionEvents: [],
  setUserEmotionEvents: () => undefined
})

export const UserProvider: React.FC<any> = ({ children }) => {
  const savedSettingsChecker = (key: string, defaultValue: any) => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item)
      } catch {
        return defaultValue
      }
    }
    return defaultValue
  }

  const [modelComplexity, setModelComplexity] = useState(savedSettingsChecker('modelComplexity', 2))

  const [camera, setCamera] = useState(savedSettingsChecker('camera', ''))
  const [postureStrictness, setPostureStrictness] = useState(
    savedSettingsChecker('postureStrictness', '1')
  )
  const [userName, setUserName] = useState('')
  const [alertFrequency, setAlertFrequency] = useState(
    savedSettingsChecker('alertFrequency', '1000')
  )

  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [userPostureEvents, setUserPostureEvents] = useState([])
  const [userEmotionEvents, setUserEmotionEvents] = useState([])

  return (
    <UserContext.Provider
      value={{
        modelComplexity,
        setModelComplexity,
        camera,
        setCamera,
        postureStrictness,
        setPostureStrictness,
        userName,
        setUserName,
        alertFrequency,
        setAlertFrequency,
        users,
        setUsers,
        events,
        setEvents,
        userPostureEvents,
        setUserPostureEvents,
        userEmotionEvents,
        setUserEmotionEvents
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
