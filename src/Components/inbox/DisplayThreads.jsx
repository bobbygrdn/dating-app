import React, { useState, useEffect } from 'react'
// import IndividualThread from './IndividualThread.jsx'
import ThreadMsgModal from "./ThreadMsgModal";

function DisplayThreads({ threads, userData, orderedProfiles }) {

    const [showThreadMsgModal, setShowThreadMsgModal] = useState(false)
    const [displayedMessages, setDisplayedMessages] = useState([])

    useEffect(() => {
        console.log(threads)
        console.log(orderedProfiles)
    }, [])

    const handleClick = (e) => {
        // console.log(e.target.id)
        fetch(`https://find-luv.herokuapp.com/api/messages/thread/${e.target.id}`)
            .then(res => res.json())
            .then(data => setDisplayedMessages(data))
            .catch(error => console.log(error))

        setShowThreadMsgModal(true)
    }
    return (
        <>
            {showThreadMsgModal ? <ThreadMsgModal setShowThreadMsgModal={setShowThreadMsgModal} displayedMessages={displayedMessages} /> : null}

            {threads.map((elem, index) => {
                return (
                    <div className='threadCard' key={index} id={elem.thread_id} onClick={handleClick} >
                        <img id={elem.thread_id} src={orderedProfiles[index].profile_pic_url} alt='thread-pic' />
                        <div id={elem.thread_id} className='thread-user-info'>
                            <h3 id={elem.thread_id}>{orderedProfiles[index].first_name} {orderedProfiles[index].last_name}, {orderedProfiles[index].age}</h3>
                            <h5 id={elem.thread_id}>{orderedProfiles[index].city}, {orderedProfiles[index].state}</h5>
                            <h6 id={elem.thread_id}>{orderedProfiles[index].gender}, {orderedProfiles[index].body_type}</h6>
                        </div>


                    </div>
                )
            })
            }

        </>
    )
}

export default DisplayThreads