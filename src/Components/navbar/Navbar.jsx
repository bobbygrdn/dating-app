import React from 'react'
import { Link } from 'react-router-dom'
import './navbarStyles.css'
import logo from "./logo.png"

function Navbar() {

    const handleClick = (e) => {
        document.querySelectorAll('.nav-link').forEach(elem => elem.classList.remove('active-tab'))
        e.target.classList.add('active-tab')
    }

    return (
        <>
        <img 
            className="logo" src={logo} alt='none' height="200px" width="200px"></img>
        <div className='navbar-container'>
             <h1 className='title'>.Find(luv)</h1>
            <ul className='navbar-UL'>
                <li>
                    <Link to='/' className='nav-link active-tab' onClick={handleClick}>Discover</Link>
                </li>
                <li>
                    <Link to='/matches' className='nav-link' onClick={handleClick}>Matches</Link>
                </li>
                <li>
                    <Link to='/inbox' className='nav-link' onClick={handleClick}>Inbox</Link>
                </li>
                <li>
                    <Link to='/pending-connections' className='nav-link' onClick={handleClick}>Connections</Link>
                </li>
                <li>
                    <Link to='/profile' className='nav-link' onClick={handleClick}>My Profile</Link>
                </li>
            </ul>
        </div>
        </>

    )
}

export default Navbar