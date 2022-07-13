import React, { useEffect, useState } from 'react'
import './inboxStyles.css'

function Inbox({ dummyUser, setDummyUser }) {

    const [threads, setThreads] = useState([])
    useEffect(() => {
        fetchAllUserThreads()
    }, [threads])

    const fetchAllUserThreads = () => {
        fetch(`https://find-luv.herokuapp.com/api/threads/user/${dummyUser['user_id']}`)
            .then(res => res.json())
            .then(data => setThreads(data))
    }

    return (
        <div className='inbox-main-container'>
            {threads.map(thread => {
                return (
                    <p>{thread['recipient_user_id']}</p>
                )
            })}
        </div>
    )
}

export default Inbox