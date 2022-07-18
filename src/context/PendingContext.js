import { useState, createContext } from "react";

const PendingContext = createContext()

export const PendingProvider = ({children}) => {
    
    /* Setting the initial state of the context. */
    const [pending, setPending] = useState([])
    const [singleConnectModal, setConnectModal] = useState(false)

    return <PendingContext.Provider value={{
        pending,
        setPending,
        singleConnectModal,
        setConnectModal
    }}>
        {children}
    </PendingContext.Provider>
}

export default PendingContext