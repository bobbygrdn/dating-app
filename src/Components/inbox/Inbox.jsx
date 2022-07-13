import React, { useEffect, useState } from 'react'
import './inboxStyles.css'
import DisplayThreads from './DisplayThreads.jsx'
import MsgLoadingThreads from './MsgLoadingThreads.jsx'
import MsgNoThreads from './MsgNoThreads.jsx'

function Inbox({ dummyUser, setDummyUser }) {

    const [threads, setThreads] = useState(null)

    useEffect(() => {
        fetchAllUserThreads()
    }, [])

    const fetchAllUserThreads = () => {
        fetch(`https://find-luv.herokuapp.com/api/threads/user/${dummyUser['user_id']}`)
            .then(res => res.json())
            .then(data => setThreads(data))
            .catch(err => console.log(err))
    }

    const fetchProfileData = (arrayOfIds) => {
        let arrayOfProfiles = []

        arrayOfIds.forEach(elem => {
            fetch(`https://find-luv.herokuapp.com/api/users/${elem}`)
                .then(res => res.json())
                .then(data => arrayOfProfiles.push(data))
                .catch(err => console.log(err))
        })

        return arrayOfProfiles
    }


    if (threads !== null) {

        let arrayOfIds = []

        threads.forEach((elem) => {
            elem.recipient_user_id === dummyUser.user_id ? arrayOfIds.unshift(elem.sender_user_id) : arrayOfIds.unshift(elem.recipient_user_id)
        })

        let arrayOfProfiles = fetchProfileData(arrayOfIds)

        return (
            <div className='inbox-main-container'>
                <DisplayThreads arrayOfProfiles={arrayOfProfiles} />
            </div>
        )
    }
}

export default Inbox
