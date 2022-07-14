import React, { useContext } from 'react'
import './inboxStyles.css'
import DisplayThreads from './DisplayThreads.jsx'
import MsgNoThreads from './MsgNoThreads.jsx'
import InboxContext from '../../context/InboxContext'

function Inbox() {

    const { threads } = useContext(InboxContext)

    return (
        <div className='inbox-main-container'>

            <DisplayThreads threads={threads} />

        </div>
    )

}

export default Inbox
