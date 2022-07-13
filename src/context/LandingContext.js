import { useState, createContext } from 'react'

const LandingContext = createContext()

export const LandingProvider = ({children}) => {
  const [ login, setLogin ] = useState(true)
  return <LandingContext.Provider value={{
    login,
    setLogin
  }}>
    {children}
  </LandingContext.Provider>
}
export default LandingContext
