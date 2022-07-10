import { useState, createContext } from 'react';

// create your context
const HomeContext = createContext()

export const HomeProvider = ({children}) => {
    // state
    const [users, setUsers] = useState(null)
    const [singleUser, setSingleUser] = useState(null);

    // functionality / functions
    const addUsers = (data) => {
        setUsers(data);
    }
    const addSingleUser = (data) => {
        setSingleUser(data);
    }
        
    return <HomeContext.Provider value={{
        users,
        addUsers,
        singleUser,
        addSingleUser
    }}>
        {children}
    </HomeContext.Provider>
}

export default HomeContext