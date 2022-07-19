import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './navbarStyles.css'

import logo from "./logo.png"
// import { useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { GrUserSettings, GrLogout } from 'react-icons/gr'
import { TbHeartHandshake, TbMessages } from 'react-icons/tb'
import { ImProfile } from 'react-icons/im' // discover?
import { RiUserHeartLine, RiHeartAddLine } from 'react-icons/ri' // discover?


function Navbar({ userData }) {

    const handleClick = (e) => {
        document.querySelectorAll('.nav-link').forEach(elem => elem.classList.remove('active-tab'))
        e.target.classList.add('active-tab')
    }

    // let navigate = useNavigate()
    const handleLogout = () => {
        // navigate('/')
        window.location.reload()
    }

    useEffect(() => {
        if (userData.dark_theme) {
            document.querySelector('body').classList.add('darkTheme')
            document.querySelector('.navbar-container').classList.add('navDarkTheme')
        }
        if (!userData.dark_theme) {
            document.querySelector('body').classList.remove('darkTheme')
            document.querySelector('.navbar-container').classList.remove('navDarkTheme')
        }
    }, [userData.dark_theme])

    useEffect(() => {
        changeFontSize()
    }, [userData.font_size])

    const changeFontSize = () => {
        let body = document.querySelector('body')

        switch (userData.font_size) {
            case 'Small':
                body.style.fontSize = '22px'
                break;
            case 'Medium':
                body.style.fontSize = '25px'
                break;
            case 'Large':
                body.style.fontSize = '28px'
                break;
            default:
                console.warn('Failed to load Font size')
        }
    }

    useEffect(() => {
        changeFontStyle()
    }, [userData.font_style])

    const changeFontStyle = () => {
        let body = document.querySelector('body')

        switch (userData['font_style']) {
            case 'Arial':
                body.style.fontFamily = 'Noto Serif'
                break;
            case 'Fantasy':
                body.style.fontFamily = 'Edu NSW ACT Foundation'
                break;
            case 'Child':
                body.style.fontFamily = 'Shadows Into Light'
                break;
            default:
                console.warn('Failed to load Font Style')
        }
    }

    return (
        <>
            <img className="logo" src={logo} alt='none' />
            <div className='navbar-container'>
                <h1 className='title'>.Find(luv)</h1>

                <ul className='navbar-UL'>
                    <li>
                        <Link to='/' className='nav-link active-tab' onClick={handleClick}>
                            <ImProfile className='nav-icon' />
                            Discover</Link>
                    </li>

                    <li className='navSpacer'>|</li>

                    <li>
                        <Link to='/inbox' className='nav-link' onClick={handleClick}>
                            <TbMessages className='nav-icon' />
                            Inbox</Link>
                    </li>

                    <li className='navSpacer'>|</li>

                    <li>
                        <Link to='/connections' className='nav-link' onClick={handleClick}>
                            <RiHeartAddLine className='nav-icon' />
                            Connections</Link>
                    </li>

                    <li className='navSpacer'>|</li>

                    <li>
                        <Link to='/profile' className='nav-link' onClick={handleClick}>
                            <GrUserSettings className='nav-icon' />
                            My Profile </Link>
                    </li>

                    <li className='navSpacer'>|</li>

                    <li>
                        <Link to='/' className='nav-link' onClick={handleLogout}>
                            <GrLogout className='nav-icon' />
                            Log out</Link>
                    </li>
                    <span className='userNameSpan'> <BiUser /> {userData.username}</span>
                </ul>

            </div>
        </>

    )
}

export default Navbar