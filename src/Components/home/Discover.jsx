import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Discover.css'
import {useContext} from 'react'
import DiscoverContext from '../../context/DiscoverContext';
import SingleUserModal from './SingleUserModal';
import SearchModal from './SearchModal';

function Discover() {

    /* Destructuring the context object. */
    const {addUsers, singleModal, addSingleUser, searchModal} = useContext(DiscoverContext)

   /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addUsers(data))
    }, [addUsers]);

    /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addSingleUser(data[0]))
    }, [addSingleUser])

    /* Returning the Users component, the SingleUserModal component, and the SearchModal component. */
    return (
        <div>
        <Users />
        <SingleUserModal show={singleModal} />
        <SearchModal show={searchModal} />
        </div>
    )

}

export default Discover