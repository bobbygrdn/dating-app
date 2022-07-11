import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar/Navbar.jsx'
import SearchResults from './Components/search-results/SearchResults.jsx'
import Matches from './Components/matches/Matches.jsx'
import Inbox from './Components/inbox/Inbox.jsx'
import PendingConnections from './Components/pending-connections/PendingConnections.jsx'
import MyProfile from './Components/profile/MyProfile.jsx'
import Discover from './Components/home/Discover.jsx';
import { DiscoverProvider } from './context/DiscoverContext.js';

function App() {

    return (
        <>
            <DiscoverProvider>
            <Navbar />

            <div className='App-container'>
                <Routes>
                    <Route path='/' element={<Discover />} />
                    <Route path='/search-results' element={<SearchResults />} />
                    <Route path='/matches' element={<Matches />} />
                    <Route path='/inbox' element={<Inbox />} />
                    <Route path='/pending-connections' element={<PendingConnections />} />
                    <Route path='/profile' element={<MyProfile />} />

                </Routes>
            </div>
            </DiscoverProvider>

        </>
    )
}

export default App