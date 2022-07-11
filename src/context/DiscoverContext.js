import { useState, createContext } from 'react';

// create your context
const DiscoverContext = createContext()

export const DiscoverProvider = ({children}) => {
    
    /* Setting the initial state of the context. */
    const [users, setUsers] = useState(null)
    const [pageUsers, setPageUsers] = useState(null)
    const [singleUser, setSingleUser] = useState(null)
    const [singleModal, setSingleModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [distance, setDistance] = useState('25')
    const [age1, setAge1] = useState('18')
    const [age2, setAge2] = useState('100')
    const [gender, setGender] = useState('male')
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)

    /**
     * "addUsers" is a function that takes in a parameter called "data" and then sets the state of
     * "users" to the value of "data".
     * 
     * "addSingleUser" is a function that takes in a parameter called "data" and then sets the state of
     * "singleUser" to the value of "data".
     */
    const addUsers = (data) => {
        setUsers(data);
    }
    const addSingleUser = (data) => {
        setSingleUser(data);
    }
        
    
    /* Returning the context provider with the value of the context. */
    return <DiscoverContext.Provider value={{
        users,
        addUsers,
        singleUser,
        addSingleUser,
        singleModal,
        setSingleModal,
        searchModal,
        setSearchModal,
        distance,
        setDistance,
        age1,
        age2,
        setAge1,
        setAge2,
        gender,
        setGender,
        page,
        setPage,
        pages,
        setPages,
        pageUsers,
        setPageUsers
    }}>
        {children}
    </DiscoverContext.Provider>
}

export default DiscoverContext