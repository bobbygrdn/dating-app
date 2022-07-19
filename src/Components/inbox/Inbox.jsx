import React, { useContext, useEffect } from 'react'
import './inboxStyles.css'
import DisplayThreads from './DisplayThreads.jsx'
import MsgNoThreads from './MsgNoThreads.jsx'
import LandingContext from "../../context/LandingContext";
import InboxContext from '../../context/InboxContext'


function Inbox() {
    const { fetchAllUserThreads } = useContext(InboxContext)

    const { userData } = useContext(LandingContext)

    const { threads, orderedProfiles } = useContext(InboxContext);

    return (
        <div className='inbox-main-container'>
            {threads.length > 0 && orderedProfiles.length > 0 ? <DisplayThreads threads={threads} orderedProfiles={orderedProfiles} userData={userData} /> : <MsgNoThreads />}
        </div>
    )

}

export default Inbox
