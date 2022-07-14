import React, { useContext } from 'react'
import './profileStyles.css'
import DarkThemeToggleBtn from './DarkThemeToggleBtn.jsx'
import FontSizeSelection from './FontSizeSelection.jsx'
import FontStyleSelection from './FontStyleSelection.jsx'
import ProfilePicPlaceHolder from './ProfilePicPlaceHolder'
import LandingContext from '../../context/LandingContext'

function MyProfile({ darkTheme, setDarkTheme }) {

    const { userData, setUserData } = useContext(LandingContext)
    return (
        <div className='profile-page-main-container'>
            <div className='pic-container'>
                {userData !== null ? <img src={userData['profile_pic_url']} alt='profile-pic' /> : <ProfilePicPlaceHolder />}
            </div>

            <div className='snapshot-container'>
                <h3>At a glance <button>test</button></h3>
                <ul className='snapshotUL'>
                    <li>{`Username: ${userData.username}`}</li>
                    <li>{`First name: ${userData.first_name}`}</li>
                    <li>{`Last name: ${userData.last_name}`}</li>
                    <li>{`Age: ${userData.age == 0 ? 'not specified' : userData.age}`}</li>
                    <li>{`Location: ${userData.city}, ${userData.state}, ${userData.zipcode}`}</li>
                </ul>
            </div>

            <div className='match-preferences-options-container'>
                <h3>Connections match info</h3>
                <ul className='connectionInfoUL'>
                    <li>{`Height: ${userData.height}`} inches</li>
                    <li>{`Body type: ${userData.body_type}`}</li>
                    <li>{`Gender: ${userData.gender}`}</li>
                    <li>{`Sexual orientation: ${userData.sexual_orientation}`}</li>
                </ul>
            </div>

            <div className='bio-details-container'>
                <h3>My Bio</h3>
                <p>{userData.bio}</p>

            </div>

            <div className='user-settings-container'>
                <DarkThemeToggleBtn darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <FontSizeSelection userData={userData} setUserData={setUserData} />
                <FontStyleSelection userData={userData} setUserData={setUserData} />
            </div>
        </div>
    )
}

export default MyProfile