import { useState, createContext } from "react";

const PendingContext = createContext()

export const PendingProvider = ({children}) => {
    
    /* Setting the initial state of the context. */
    const [pending, setPending] = useState(null)
    const [singleConnectModal, setConnectModal] = useState(false)

    /**
     * It takes two user ids, creates a new thread between them, and then closes the modal.
     * @param user - the user that is logged in
     * @param clickedUser - the user that was clicked on in the list
     */
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

        fetch(`https://find-luv.herokuapp.com/api/threads`, fetchData)
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
        setConnectModal,
        connectUser
    }}>
        {children}
    </PendingContext.Provider>
}

export default PendingContext