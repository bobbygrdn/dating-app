import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Discover.css'
import {useContext} from 'react'
import DiscoverContext from '../../context/DiscoverContext';
import SingleUserModal from './SingleUserModal';
import SearchModal from './SearchModal';

function Discover() {

    /* Destructuring the context object. */
    const {addUsers, singleModal, addSingleUser, searchModal, users, setPages} = useContext(DiscoverContext)

   /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addUsers(data))
    }, []);

    /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addSingleUser(data[0]))
    }, [])

    /* Creating an array of numbers that will be used to create the pagination buttons. */
    function updatePages () {
        let numOfPages = Math.round(users.length/24)
        let newArray = [];
        for (let i = 1; i <= numOfPages; i++) {
            const current = i;
            newArray.push(current);    
        }
        setPages(newArray)
    }    
    if(users !== null) {
            updatePages();
    }

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