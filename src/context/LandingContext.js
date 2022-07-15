import { useState, createContext } from 'react'

const LandingContext = createContext()

export const LandingProvider = ({ children }) => {
  const [login, setLogin] = useState(false)
  const [userData, setUserData] = useState(null)
  const [buttonPressed, setWhichButtonWasPressed] = useState(null)
  const pressedButton = (whichOne) => {
    setWhichButtonWasPressed(whichOne)
  }

  const changeUserData = (formData) => {
    setUserData(() => {
      return {
        ...userData,
        ...formData
      }
    })
  }

  return <LandingContext.Provider value={{
    login,
    setLogin,
    userData,
    setUserData,
    buttonPressed,
    pressedButton,
    changeUserData
  }}>
    {children}
  </LandingContext.Provider>
}
export default LandingContext
