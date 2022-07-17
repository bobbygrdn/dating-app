import React, { useContext, useEffect } from 'react'
import './inboxStyles.css'
import DisplayThreads from './DisplayThreads.jsx'
import MsgNoThreads from './MsgNoThreads.jsx'
import LandingContext from "../../context/LandingContext";
import InboxContext from '../../context/InboxContext'

function Inbox() {
    const { login, buttonPressed, userData } = useContext(LandingContext)

    const { threads } = useContext(InboxContext);
    
    return (
        <div className='inbox-main-container'>
            {threads.length > 0 ? <DisplayThreads threads={threads} userData={userData} /> : <MsgNoThreads/>}

        </div>
    )

}

export default Inbox
