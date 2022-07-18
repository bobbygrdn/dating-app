import { useState, createContext } from "react";

const PendingContext = createContext()

export const PendingProvider = ({children}) => {
    
    /* Setting the initial state of the context. */
    const [pending, setPending] = useState([])
    const [singleConnectModal, setConnectModal] = useState(false)

    const connectUser = (user, clickedUser) => {
        let data = {
            recipient_user_id: user,
            sender_user_id: clickedUser
        }

        let fetchData = {
            method: "POST",
            headers: new Headers ({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:8000/api/threads`, fetchData)
        .then(() => {
            console.log(`Created Thread between ${user} and ${clickedUser}`)
        })
        .catch(error => {
            console.error(error)
        })
        setConnectModal(false)

    }

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