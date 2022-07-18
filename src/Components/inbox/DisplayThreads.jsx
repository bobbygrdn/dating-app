import React, { useState, useEffect } from 'react'
// import IndividualThread from './IndividualThread.jsx'
import ThreadMsgModal from "./ThreadMsgModal";

function DisplayThreads({ threads, userData, orderedProfiles }) {

    const [showThreadMsgModal, setShowThreadMsgModal] = useState(false)
    const [displayedMessages, setDisplayedMessages] = useState([])
    const [threadMsgUserInfo, setThreadMsgUserInfo] = useState({
        pic: '',
        name: ''
    })

    useEffect(() => {
        console.log(threads)
        console.log(orderedProfiles)
    }, [])

    const handleClick = (e) => {
        setDisplayedMessages([])
        setThreadMsgUserInfo({
            pic: e.currentTarget.title,
            name: e.currentTarget.align
        })

        fetchAllMsgsByThreadId(e.currentTarget.id)

        setShowThreadMsgModal(true)
    }

    const fetchAllMsgsByThreadId = (id) => {
        fetch(`https://find-luv.herokuapp.com/api/messages/thread/${id}`)
            .then(res => res.json())
            .then(data => setDisplayedMessages(data))
            .catch(error => console.log(error))
    }

    return (
        <>
            {showThreadMsgModal ? <ThreadMsgModal userData={userData} setShowThreadMsgModal={setShowThreadMsgModal} displayedMessages={displayedMessages} setDisplayedMessages={setDisplayedMessages} threadMsgUserInfo={threadMsgUserInfo} /> : null}

            {threads.map((elem, index) => {
                return (
                    <div className='threadCard' key={index} id={elem.thread_id} align={`${orderedProfiles[index].first_name} ${orderedProfiles[index].last_name}`} title={orderedProfiles[index].profile_pic_url} onClick={handleClick} >
                        <img src={orderedProfiles[index].profile_pic_url} alt='thread-pic' />
                        <div className='thread-user-info'>
                            <h3>{orderedProfiles[index].first_name} {orderedProfiles[index].last_name}, {orderedProfiles[index].age}</h3>
                            <h5>{orderedProfiles[index].city}, {orderedProfiles[index].state}</h5>
                            <h6>{orderedProfiles[index].gender}, {orderedProfiles[index].body_type}</h6>
                        </div>


                    </div>
                )
            })
            }

        </>
    )
}

export default DisplayThreads