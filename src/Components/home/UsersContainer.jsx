import React from 'react'
import User from './User';
import {useContext} from 'react';
import HomeContext from '../../context/HomeContext';

function Users() {
    const {users} = useContext(HomeContext)
    
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