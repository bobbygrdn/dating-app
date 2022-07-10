import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Home.css'
import {useContext} from 'react'
import HomeContext from '../../context/HomeContext';


function Home() {

    const {addUsers} = useContext(HomeContext)

    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addUsers(data))
    }, []);

    return (
        <div>
        <Users />
        </div>
    )
}

export default Home