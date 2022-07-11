import React from 'react'
import User from './User';
import {useContext} from 'react';
import DiscoverContext from '../../context/DiscoverContext';
// import DiscoverNavBar from './DiscoverNavBar';

function Users() {
    /* Destructuring the context object. */
    const {setSearchModal, users} = useContext(DiscoverContext)
    
    /**
     * When the user clicks on the search icon, the search modal will appear.
     */
    const handleClick = () => {
        setSearchModal(true)
    }

    /* Checking if the users array is not null. If it is not null, then it will return the Users component. */
    if(users !== null) {
        return (
            <div className='discoverContainer'>
                {/* A button that when clicked, it will show the search modal. */}
                <button className='searchButton' onClick={handleClick}>Search</button>
                {/* Mapping through the users array and returning the User component. */}
                <div className='usersContainer'>
                    {users.map((elem) => {
                        
                        return (
                            <User elem={elem} key={elem.user_id} />
                        )
                    })}
                    {/* <DiscoverNavBar /> */}
                </div>
            </div>
    )}
}

export default Users