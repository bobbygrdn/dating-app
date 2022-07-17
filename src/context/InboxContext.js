import { useState, createContext, useContext } from 'react';
import LandingContext from './LandingContext';

const InboxContext = createContext()

export const InboxProvider = ({ children }) => {

    const [threads, setThreads] = useState(null)

    const { userData } = useContext(LandingContext)

    const fetchAllUserThreads = () => {
        fetch(`https://find-luv.herokuapp.com/api/threads/user/${userData.user_id}`)
            .then(res => res.json())
            .then(data => setThreads(data))
            .catch(err => console.log(err))
    }

    return <InboxContext.Provider value={{
        threads,
        setThreads,
        fetchAllUserThreads
    }}>
        {children}
    </InboxContext.Provider>
}

export default InboxContext