import { createContext, useState } from 'react'

export const UserContext = createContext<{
  modelComplexity: 0 | 1 | 2 | undefined
  setModelComplexity: (newValue) => void
}>({
  modelComplexity: 1,
  setModelComplexity: () => undefined
})

export const UserProvider: React.FC<any> = ({ children }) => {
  const saved = JSON.parse(localStorage.getItem('currentUser') || '1')
  const [modelComplexity, setModelComplexity] = useState(saved)
  return (
    <UserContext.Provider value={{ modelComplexity, setModelComplexity }}>
      {children}
    </UserContext.Provider>
  )
}
