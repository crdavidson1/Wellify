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
  const saved = JSON.parse(localStorage.getItem('currentUser') || '1')
  const [modelComplexity, setModelComplexity] = useState(saved)
  const [camera, setCamera] = useState('')
  const [postureStrictness, setPostureStrictness] = useState('')
  return (
    <UserContext.Provider value={{ modelComplexity, setModelComplexity, camera, setCamera, postureStrictness, setPostureStrictness }}>
      {children}
    </UserContext.Provider>
  )
}
