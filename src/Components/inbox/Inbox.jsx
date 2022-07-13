import React, { useEffect, useState } from 'react'
import './inboxStyles.css'
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
    }

    const obtainUserIds = () => {
        let arrayOfUserIdsToFetch = [];

        threads.forEach(item => {
            item.recipient_user_id === dummyUser.user_id ? arrayOfUserIdsToFetch = [item.sender_user_id, ...arrayOfUserIdsToFetch] : arrayOfUserIdsToFetch = [item.recipient_user_id, ...arrayOfUserIdsToFetch]
        })

        fetchUserProfileData(arrayOfUserIdsToFetch)
    }

    const fetchUserProfileData = (arrayOfIds) => {
        let arrayOfProfileData = []

        arrayOfIds.forEach(item => {
            fetch(`https://find-luv.herokuapp.com/api/users/${item}`)
                .then(res => res.json())
                .then(data => arrayOfProfileData.push(data))
        })

        displayThreadCards(arrayOfProfileData)
    }

    const displayThreadCards = (arrayOfProfileData) => {
        arrayOfProfileData.forEach(profile => {
            console.log(profile)
            return (
                <p>{profile.user_id}</p>
            )
        })
    }
    return (
        <div className='inbox-main-container'>
            {threads.length > 0 ? obtainUserIds() : <MsgNoThreads />}

            {/* {threads.map(thread => {
                return (
                    <p>{thread['recipient_user_id']}</p>
                )
            })} */}

        </div>
    )
}

export default Inbox