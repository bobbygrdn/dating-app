import React, { useState, useEffect } from "react";
import ThreadMsgModal from "./ThreadMsgModal";

function IndividualThread({ threads, profiles }) {
    // const [showThreadMsgModal, setShowThreadMsgModal] = useState(false)
    useEffect(() => {
        console.log(profiles)
    }, [])
    const handleClick = (e) => {
        console.log(e.target.id)
        // setShowThreadMsgModal(true)

    }

    if (profiles.length > 0) return (
        <>
            {threads.map((elem, index) => {
                return (
                    <div className='threadCard' key={index} id={elem.thread_id} onClick={handleClick} >
                        {/* <img id={elem.thread_id} src={profiles[index].profile_pic_url} alt='thread-pic' /> */}
                        <div id={elem.thread_id} className='thread-user-info'>
                            <h3 id={elem.thread_id}>{profiles[index].first_name} {profiles[index].last_name}, {profiles[index].age}</h3>
                            <h5 id={elem.thread_id}>{profiles[index].city}, {profiles[index].state}</h5>
                            <h6 id={elem.thread_id}>{profiles[index].gender}, {profiles[index].body_type}</h6>
                        </div>


                    </div>
                )
            })
            }

        </>
    )
}

export default IndividualThread