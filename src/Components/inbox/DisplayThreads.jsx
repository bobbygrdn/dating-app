import React, { useState, useEffect } from 'react'
import IndividualThread from './IndividualThread.jsx'

function DisplayThreads({ threads, dummyUser }) {

    const [profiles, setProfiles] = useState(null)

    useEffect(() => {

        let arrayOfIds = []

        threads.forEach((elem) => {
            if (elem.recipient_user_id === dummyUser.user_id) {
                return arrayOfIds.push(elem.sender_user_id)
            }

            else {
                return arrayOfIds.push(elem.recipient_user_id)
            }
        })
        createProfilesArray(arrayOfIds)
    }, [])


    const createProfilesArray = (arrayOfIds) => {
        let arrayOfProfiles = []
        arrayOfIds.forEach((elem) => {

            fetch(`https://find-luv.herokuapp.com/api/users/${elem}`)
                .then(res => res.json())
                .then(data => { arrayOfProfiles.push(data) })
        })
        setProfiles(arrayOfProfiles)
    }
    // if (profiles) { return console.log('yes') }
    if (profiles) { return <IndividualThread threads={threads} profiles={profiles} /> }

}

export default DisplayThreads