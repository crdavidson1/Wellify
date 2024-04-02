import { createContext, useState } from 'react'

export const UserContext = createContext<{
  modelComplexity: 0 | 1 | 2 | undefined
  setModelComplexity: (newValue) => void
  camera: string
  setCamera: (newValue) => void
  postureStrictness: string
  setPostureStrictness: (newValue) => void
}>({
  modelComplexity: 1,
  setModelComplexity: () => undefined,
  camera: '',
  setCamera: () => undefined,
  postureStrictness: '',
  setPostureStrictness: () => undefined
})

export const UserProvider: React.FC<any> = ({ children }) => {
  const savedComplexity = JSON.parse(localStorage.getItem('modelComplexity') || '1')
  const [modelComplexity, setModelComplexity] = useState(savedComplexity)
  // const savedCamera = JSON.parse(localStorage.getItem('camera') || 'camera')
  const [camera, setCamera] = useState('')
  const savedStrictness = JSON.parse(localStorage.getItem('postureStrictness') || '1')
  const [postureStrictness, setPostureStrictness] = useState(savedStrictness)
  return (
    <UserContext.Provider value={{ modelComplexity, setModelComplexity, camera, setCamera, postureStrictness, setPostureStrictness }}>
      {children}
    </UserContext.Provider>
  )
}
