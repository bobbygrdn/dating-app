import React, { useEffect, useState } from 'react'
import './inboxStyles.css'
import DisplayThreads from './DisplayThreads.jsx'
import MsgLoadingThreads from './MsgLoadingThreads.jsx'
import MsgNoThreads from './MsgNoThreads.jsx'

function Inbox({ dummyUser, setDummyUser }) {

    const [threads, setThreads] = useState([])

    useEffect(() => {
        fetchAllUserThreads()
    }, [])

    const fetchAllUserThreads = () => {
        fetch(`https://find-luv.herokuapp.com/api/threads/user/${dummyUser['user_id']}`)
            .then(res => res.json())
            .then(data => setThreads(data))
            .catch(err => console.log(err))
    }


    return (
        <div className='inbox-main-container'>

            <DisplayThreads threads={threads} dummyUser={dummyUser} />

        </div>
    )
}

export default Inbox
