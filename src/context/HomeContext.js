import { useState, createContext } from 'react';

// create your context
const HomeContext = createContext()

export const HomeProvider = ({children}) => {
    // state
    const [users, setUsers] = useState(null)

    // functionality / functions
    const addUsers = (data) => {
        setUsers(data);
    }
        
    return <HomeContext.Provider value={{
        users,
        addUsers
    }}>
        {children}
    </HomeContext.Provider>
}

export default HomeContext