import React, { createContext, useState } from 'react'

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
}>({
  modelComplexity: 2,
  setModelComplexity: () => undefined,
  camera: '',
  setCamera: () => undefined,
  postureStrictness: '',
  setPostureStrictness: () => undefined,
  userName: '',
  setUserName: () => undefined
  alertFrequency: '',
  setAlertFrequency: () => undefined
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
        setUserName
        alertFrequency,
        setAlertFrequency
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
