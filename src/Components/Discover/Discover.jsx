import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Discover.css'
import { useContext } from 'react'
import DiscoverContext from '../../context/DiscoverContext';
import SingleUserModal from './SingleUserModal';
import SearchModal from './SearchModal';
import LandingContext from '../../context/LandingContext'
import SearchUserModal from './SearchUserModal';

function Discover() {

    /* Destructuring the context object. */
    const { addUsers, singleModal, addSingleUser, searchModal, searchUserModal, age1, age2, gender } = useContext(DiscoverContext)

    /* Destructuring the context object. */
    const { userData } = useContext(LandingContext)

    /* Fetching the data from the API and adding it to the state. */

    useEffect(() => {
        const interval = setInterval(() => {
            getUsers()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const getUsers = () => {
        if (gender === null && age1 === null && age2 === null) {
            if (userData.gender_preference !== 'not specified' && userData.age1 !== 'not specified' && userData.age2 !== 'not specified') {
                fetch(`https://find-luv.onrender.com/api/current/${userData.user_id}/${userData.age1}/${userData.age2}/${userData.gender_preference}`)
                    .then(response => response.json())
                    .then(data => addUsers(data))
            } else {
                fetch(`https://find-luv.onrender.com/api/current/${userData.user_id}`)
                    .then(response => response.json())
                    .then(data => addUsers(data))
            }
        }
    }

    /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        fetch('https://find-luv.onrender.com/api/users')
            .then(response => response.json())
            .then(data => addSingleUser(data[0]))
    }, [])



    /* Returning the Users component, the SingleUserModal component, and the SearchModal component. */
    return (
        <div>
            <Users />
            <SingleUserModal show={singleModal} />
            <SearchModal show={searchModal} />
            {/* <SearchUserModal show={searchUserModal} /> */}
        </div>
    )

}

export default Discover