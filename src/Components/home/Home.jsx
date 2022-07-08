import React from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Home.css'

function Home(props) {
    
    return (
        <div className='usersContainer'>
        <Users users={props.users}/>
        </div>
    )
}

export default Home