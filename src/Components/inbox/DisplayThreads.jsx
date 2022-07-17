import React, { useState, useEffect } from 'react'
import IndividualThread from './IndividualThread.jsx'

function DisplayThreads({ threads, userData, orderedProfiles }) {

    useEffect(() => {
        console.log(threads)
        console.log(orderedProfiles)
    }, [])


    // if (profiles) { return <IndividualThread threads={threads} profiles={profiles} /> }
    const handleClick = (e) => {
        console.log(e.target.id)
        // setShowThreadMsgModal(true)

    }
    return (
        <>
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