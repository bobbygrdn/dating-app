import { useState, createContext } from 'react';

// create your context
const DiscoverContext = createContext()

export const DiscoverProvider = ({children}) => {
    // state
    const [users, setUsers] = useState(null)
    const [singleUser, setSingleUser] = useState(null);
    const [singleModal, setSingleModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)

    // functionality / functions
    const addUsers = (data) => {
        setUsers(data);
    }
    const addSingleUser = (data) => {
        setSingleUser(data);
    }

    const addSearch = (data) => {
        setSearchModal(data);
    }
        
    return <DiscoverContext.Provider value={{
        users,
        addUsers,
        singleUser,
        addSingleUser,
        singleModal,
        setSingleModal,
        searchModal,
        addSearch
    }}>
        {children}
    </DiscoverContext.Provider>
}

export default DiscoverContext