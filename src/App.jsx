import { React, useContext, useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar/Navbar.jsx'
import SearchResults from './Components/search-results/SearchResults.jsx'
import Matches from './Components/matches/Matches.jsx'
import Inbox from './Components/inbox/Inbox.jsx'
import PendingConnections from './Components/pending-connections/PendingConnections.jsx'
import MyProfile from './Components/profile/MyProfile.jsx'
import Landing from './Components/Landing/Landing.jsx'
import Discover from './Components/home/Discover.jsx';
import { DiscoverProvider } from './context/DiscoverContext.js';
import { LandingProvider } from './context/LandingContext.js'
import LandingContext from './context/LandingContext'
function App() {

    const [darkTheme, setDarkTheme] = useState(false)
    const [dummyUser, setDummyUser] = useState(null)
    const { login } = useContext(LandingContext)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = () => {
        fetch('https://find-luv.herokuapp.com/api/users/1')
            .then(res => res.json())
            .then(data => setDummyUser(data))
    }
    if (!login) {
        return (
            <>
                <LandingProvider>
                    <Landing/>
                </LandingProvider>
            </>
        )
    } else {
        return (
            <>

            <Navbar />

            <div className='App-container'>
                <LandingProvider>
                <DiscoverProvider>

                <Navbar />

                <Routes>

                    <Route path='/' element={<Discover />} />
                    <Route path='/search-results' element={<SearchResults />} />
                    <Route path='/matches' element={<Matches />} />
                    <Route path='/inbox' element={<Inbox />} />
                    <Route path='/pending-connections' element={<PendingConnections />} />
                    <Route path='/profile' element={<MyProfile darkTheme={darkTheme} setDarkTheme={setDarkTheme} dummyUser={dummyUser} setDummyUser={setDummyUser} />} />

                </Routes>
                </DiscoverProvider>
                </LandingProvider>
            </div>

            </>
        )
    }
}

export default App
