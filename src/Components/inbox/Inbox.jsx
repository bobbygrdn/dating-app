import React, { useEffect, useState, useContext } from 'react'
import './inboxStyles.css'
import DisplayThreads from './DisplayThreads.jsx'
import MsgLoadingThreads from './MsgLoadingThreads.jsx'
import MsgNoThreads from './MsgNoThreads.jsx'
import LandingContext from '../../context/LandingContext'
import InboxContext from '../../context/InboxContext'

function Inbox() {

    const { userData, setUserData, login } = useContext(LandingContext)

    const { threads } = useContext(InboxContext)

    useEffect(() => {

    }, [])


    if (threads !== null) {
        return (
            <div className='inbox-main-container'>

                <DisplayThreads threads={threads} dummyUser={userData} />

            </div>
        )
    }
}

export default Inbox
