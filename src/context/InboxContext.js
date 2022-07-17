import { useState, createContext, useContext } from 'react';
import LandingContext from './LandingContext';

const InboxContext = createContext()

export const InboxProvider = ({ children }) => {

    const [threads, setThreads] = useState(null)
    const [profiles, setProfiles] = useState([])
    const [orderedProfiles, setOrderedProfiles] = useState([])

    const { userData } = useContext(LandingContext)

    const fetchAllUserThreads = () => {
        fetch(`https://find-luv.herokuapp.com/api/threads/user/${userData.user_id}`)
            .then(res => res.json())
            .then(data => setThreads(data))
            .catch(err => console.log(err))
    }

    const handleDisplayingThreads = () => {
        if (!threads) return;

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
        // orderProfileArray(profiles, arrayOfIds)
        orderProfileArray(profilesArray, arrayOfIds)

    }

    const createProfilesArray = (arrayOfIds) => {
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
        // console.log(array, arrayOfIds)
        array.forEach((elem, index) => {

            let correctIndex = arrayOfIds.indexOf(elem.user_id)

            if (index !== correctIndex) {
                let temp = array[correctIndex]// current element
                array[correctIndex] = array[index]
                array[index] = temp
            }
        })

        // console.log(array, arrayOfIds)

        return setOrderedProfiles(array)
    }

    return <InboxContext.Provider value={{
        threads,
        setThreads,
        fetchAllUserThreads,
        handleDisplayingThreads,
        profiles,
        orderedProfiles
    }}>
        {children}
    </InboxContext.Provider>
}

export default InboxContext