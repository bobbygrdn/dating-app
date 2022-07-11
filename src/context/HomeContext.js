import { useState, createContext } from 'react';

// create your context
const HomeContext = createContext()

export const HomeProvider = ({children}) => {
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
        
    return <HomeContext.Provider value={{
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
    </HomeContext.Provider>
}

export default HomeContext