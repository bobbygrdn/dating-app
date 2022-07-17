import React, { useState, useEffect } from 'react'
import IndividualThread from './IndividualThread.jsx'

function DisplayThreads({ threads, userData }) {

    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        //accumulates arrays of ids
        let arrayOfIds = []
        //looks for id not equal to current user id
        threads.forEach((elem) => {
            if (elem.recipient_user_id === userData.user_id) {
                return arrayOfIds.push(elem.sender_user_id)
            }
            else {
                return arrayOfIds.push(elem.recipient_user_id)
            }
        })
        //sends array of ids to func that query's DB and returns array of profiles
        let profilesArray = createProfilesArray(arrayOfIds)
        setProfiles(profilesArray)
        orderProfileArray(profiles, arrayOfIds)
    }, [])


    const createProfilesArray = (arrayOfIds) => {
        console.log(arrayOfIds)
        let arrayOfProfiles = []
        arrayOfIds.forEach((elem) => {
            fetch(`https://find-luv.herokuapp.com/api/users/${elem}`)
                .then(res => res.json())
                .then(data => arrayOfProfiles.push(data))
        })
        return arrayOfProfiles
        // console.log(arrayOfIds.indexOf(394))
    }

    const orderProfileArray = (array, arrayOfIds) => {

        array.forEach((elem, index) => {

            let correctIndex = arrayOfIds.indexOf(elem.user_id)

            if (index !== correctIndex) {
                let temp = array[correctIndex]// current element
                array[correctIndex] = array[index]
                array[index] = temp
            }
        })
        setProfiles(array)
    }
    // if (profiles) { return <IndividualThread threads={threads} profiles={profiles} /> }
}

export default DisplayThreads