import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar/Navbar.jsx'
import Matches from './Components/matches/Matches.jsx'
import Inbox from './Components/inbox/Inbox.jsx'
import PendingConnections from './Components/pending-connections/PendingConnections.jsx'
import MyProfile from './Components/profile/MyProfile.jsx'
import Discover from './Components/home/Discover.jsx';
import { DiscoverProvider } from './context/DiscoverContext.js';

function App() {

    const [darkTheme, setDarkTheme] = useState(false)
    const [dummyUser, setDummyUser] = useState(null)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = () => {
        fetch('https://find-luv.herokuapp.com/api/users/1')
            .then(res => res.json())
            .then(data => setDummyUser(data))
    }
    return (

        <div className='App-container'>
            <DiscoverProvider>
                <Navbar />

                <Routes>

                    <Route path='/' element={<Discover />} />
                    <Route path='/matches' element={<Matches />} />
                    <Route path='/inbox' element={<Inbox dummyUser={dummyUser} />} />
                    <Route path='/pending-connections' element={<PendingConnections />} />
                    <Route path='/profile' element={<MyProfile darkTheme={darkTheme} setDarkTheme={setDarkTheme} dummyUser={dummyUser} setDummyUser={setDummyUser} />} />

                </Routes>
            </DiscoverProvider>
        </div>

    )
}

export default App