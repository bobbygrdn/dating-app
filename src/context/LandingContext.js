import { useState, createContext } from 'react'

const LandingContext = createContext()

export const LandingProvider = ({children}) => {
  const [ login, setLogin ] = useState(false)
  const [ newUser, setNewUser ] = useState(null)
  const [ buttonPressed, setWhichButtonWasPressed ] = useState(null)
  const pressedButton = (whichOne) => {
    setWhichButtonWasPressed(whichOne)
  }
  return <LandingContext.Provider value={{
    login,
    setLogin,
    newUser,
    setNewUser,
    buttonPressed,
    pressedButton
  }}>
    {children}
  </LandingContext.Provider>
}
export default LandingContext
