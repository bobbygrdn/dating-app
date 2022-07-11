import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Home.css'
import {useContext} from 'react'
import HomeContext from '../../context/HomeContext';
import SingleUserModal from './SingleUserModal';

function Home() {

    const {addUsers, singleModal, addSingleUser} = useContext(HomeContext)

    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addUsers(data))
    }, []);

    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addSingleUser(data[0]))
    }, [])

    return (
        <div>
        <Users />
        <SingleUserModal show={singleModal} />
        </div>
    )

}

export default Home