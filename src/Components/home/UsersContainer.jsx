import React from 'react'
import User from './User';
import {useContext} from 'react';
import DiscoverContext from '../../context/DiscoverContext';

function Users() {
    const {users, searchModal} = useContext(DiscoverContext)
    
    if(users !== null) {
        return (
            <div className='discoverContainer'>
                <button className='searchButton'>Search</button>
                <div className='usersContainer'>
                    {users.map((elem) => {
                        return (
                            <User elem={elem} key={elem.user_id} />
                            )
                        })}
                </div>
            </div>
    )}
}

export default Users