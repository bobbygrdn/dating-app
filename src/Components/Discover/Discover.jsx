import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Discover.css'
import { useContext } from 'react'
import DiscoverContext from '../../context/DiscoverContext';
import SingleUserModal from './SingleUserModal';
import SearchModal from './SearchModal';
import LandingContext from '../../context/LandingContext'

function Discover() {

    /* Destructuring the context object. */
    const { addUsers, singleModal, addSingleUser, searchModal } = useContext(DiscoverContext)

    /* Destructuring the context object. */
    const { userData } = useContext(LandingContext)
    
    /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        if(userData.gender_preference !== 'not specified' && userData.age1 !== 'not specified' && userData.age2 !== 'not specified') {
            fetch(`http://localhost:8000/api/current/${userData.user_id}/${userData.age1}/${userData.age2}/${userData.gender_preference}`)
            .then(response => response.json())
            .then(data => addUsers(data))
        } else {
            fetch(`http://localhost:8000/api/current/${userData.user_id}`)
            .then(response => response.json())
            .then(data => addUsers(data))
        }
            
    }, []);

    /* Fetching the data from the API and adding it to the state. */
    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
            .then(response => response.json())
            .then(data => addSingleUser(data[0]))
    }, [])



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