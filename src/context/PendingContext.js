import { useState, createContext } from "react";

const PendingContext = createContext()

export const PendingProvider = ({children}) => {
    
    /* Setting the initial state of the context. */
    const [pending, setPending] = useState(null)

    return <PendingContext.Provider value={{
        pending,
        setPending
    }}>
        {children}
    </PendingContext.Provider>
}

export default PendingContext