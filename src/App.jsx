import { React, useContext, useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar/Navbar.jsx'
import Matches from './Components/matches/Matches.jsx'
import Inbox from './Components/inbox/Inbox.jsx'
import PendingConnections from './Components/pending-connections/PendingConnections.jsx'
import MyProfile from './Components/profile/MyProfile.jsx'
import Landing from './Components/Landing/Landing.jsx'
import Discover from './Components/home/Discover.jsx';
import CreateUserForm from './Components/Landing/CreateUserForm'
import Login from './Components/Landing/Login'
import { DiscoverProvider } from './context/DiscoverContext.js';
import LandingContext from './context/LandingContext'
import InboxContext from './context/InboxContext.js';
import '../src/ComponentStyles/CreateSlashLogin.css'

function App() {

    const [darkTheme, setDarkTheme] = useState(false)
    const { login, buttonPressed } = useContext(LandingContext)
    const { threads, fetchAllUserThreads } = useContext(InboxContext)


    useEffect(() => {
        checkIfLoggedIn()
    }, [login])

    const checkIfLoggedIn = () => {
        // if (login) { return fetchAllUserThreads() }
    }

    if (!login) {
        if (!buttonPressed) return (<Landing />)
        else if (buttonPressed === 'createUserButton') return (<CreateUserForm />)
        else if (buttonPressed === 'loginButton') return (<Login />)
    } else {
        return (

            <div className='App-container'>
                <DiscoverProvider>
                    <Navbar />

                    <Routes>

                        <Route path='/' element={<Discover />} />
                        <Route path='/matches' element={<Matches />} />
                        <Route path='/inbox' element={<Inbox />} />
                        <Route path='/pending-connections' element={<PendingConnections />} />
                        <Route path='/profile' element={<MyProfile darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />

                    </Routes>
                </DiscoverProvider>
            </div>

        )
    }
}
export default App
