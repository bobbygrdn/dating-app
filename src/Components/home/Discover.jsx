import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Discover.css'
import {useContext} from 'react'
import DiscoverContext from '../../context/DiscoverContext';
import SingleUserModal from './SingleUserModal';
import SearchModal from './SearchModal';
import LandingContext from '../../context/LandingContext'

function Discover() {

    /* Destructuring the context object. */
    const {addUsers, singleModal, addSingleUser, searchModal} = useContext(DiscoverContext)

    const {userData} = useContext(LandingContext)

   /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        let info ={
            gender: userData.gender,
            age1: userData.age1,
            age2: userData.age2,
        }

        let fetchData = {
            method: 'GET',
            body: JSON.stringify(info),
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        }

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

    /* Returning the Users component, the SingleUserModal component, and the SearchModal component. */
    console.log(userData);
    return (
        <div>
        <Users />
        <SingleUserModal show={singleModal} />
        <SearchModal show={searchModal} />
        </div>
    )

}

export default Discover