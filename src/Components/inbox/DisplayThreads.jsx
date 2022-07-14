import React, { useState, useEffect } from 'react'

function DisplayThreads({ threads, dummyUser }) {


    const [profileData, setProfileData] = useState([])
    const [userIds, setUserIds] = useState([])

    console.log(threads)


    const profilePic = (id) => {
        fetch(`https://find-luv.herokuapp.com/api/users/${id}`)
            .then(res => res.json())
            .then(data => { console.log(data) })

    }

    if (threads.length > 0) {
        threads.forEach(elem => {
            let id;
            if (elem.recipient_user_id === dummyUser.user_id) {
                id = elem.sender_user_id
            }
            else {
                id = elem.recipient_user_id
            }
            profilePic(id)
        })
    }



    return (
        <>
            {threads.map((elem) => (

                <div id={elem.thread_id} >
                    {elem.thread_id}

                </div>
            ))}
        </>
    );



}


export default DisplayThreads