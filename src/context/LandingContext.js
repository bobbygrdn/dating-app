import { useState, createContext } from 'react'

const LandingContext = createContext()

export const LandingProvider = ({ children }) => {
  const [login, setLogin] = useState(false)
  const [userData, setUserData] = useState(null)
  const [buttonPressed, setWhichButtonWasPressed] = useState('createUserButton')
  const pressedButton = (whichOne) => {
    setWhichButtonWasPressed(whichOne)
  }
  return <LandingContext.Provider value={{
    login,
    setLogin,
    userData,
    setUserData,
    buttonPressed,
    pressedButton
  }}>
    {children}
  </LandingContext.Provider>
}
export default LandingContext
