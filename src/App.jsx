import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar/Navbar.jsx'
import Home from './Components/home/Home.jsx'
import SearchResults from './Components/search-results/SearchResults.jsx'
import Matches from './Components/matches/Matches.jsx'
import Inbox from './Components/inbox/Inbox.jsx'
import PendingConnections from './Components/pending-connections/PendingConnections.jsx'
import MyProfile from './Components/profile/MyProfile.jsx'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => setUsers({data}))
    }, []);

    return (
        <>
            <Navbar />

            <div className='App-container'>
                <Routes>

                    <Route path='/' element={<Home users={users}/>} />
                    <Route path='/search-results' element={<SearchResults />} />
                    <Route path='/matches' element={<Matches />} />
                    <Route path='/inbox' element={<Inbox />} />
                    <Route path='/pending-connections' element={<PendingConnections />} />
                    <Route path='/profile' element={<MyProfile />} />

                </Routes>
            </div>

        </>
    )
}

export default App