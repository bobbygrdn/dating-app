import { computeHeadingLevel } from '@testing-library/react'
import React, { useState, useEffect } from 'react'

function DisplayThreads({ threads, dummyUser }) {


    const [profileData, setProfileData] = useState([])
    const [userIds, setUserIds] = useState([])

    console.log(threads)

    useEffect(() => {
    }, [])


    const profilePic = (id) => {
        fetch(`https://find-luv.herokuapp.com/api/users/${id}`)
            .then(res => res.json())
            .then(data => { return data.profile_pic_url })
    }


    return (
        <>
            {threads.map(elem => {
                let id;
                if (elem.recipient_user_id === dummyUser.user_id) {
                    id = elem.sender_user_id
                    {/* url = profilePic(elem.sender_user_id) */ }
                }
                else {
                    id = elem.recipient_user_id
                    {/* url = profilePic(elem.recipient_user_id) */ }
                }

                let url = profilePic(id)

                console.log(url)

                return (<div id={elem.thread_id}>
                    {elem.thread_id}
                    {url != undefined ? <img src={url} alt='thread-pic' /> : null}
                </div>)
            })}
        </>
    );



}


export default DisplayThreads