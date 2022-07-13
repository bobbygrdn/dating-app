import React from 'react'
import './profileStyles.css'
import DarkThemeToggleBtn from './DarkThemeToggleBtn.jsx'
import FontSizeSelection from './FontSizeSelection.jsx'
import FontStyleSelection from './FontStyleSelection.jsx'
import ProfilePicPlaceHolder from './ProfilePicPlaceHolder'

function MyProfile({ darkTheme, setDarkTheme, dummyUser, setDummyUser }) {

    return (
        <div className='profile-page-main-container'>
            <div className='pic-container'>
                {dummyUser !== null ? <img src={dummyUser['profile_pic_url']} alt='profile-pic' /> : <ProfilePicPlaceHolder />}
            </div>

            <div className='snapshot-container'>
                <h3>At a glance</h3>
                <ul className='snapshotUL'>
                    <li>{`Username: ${dummyUser.username}`}</li>
                    <li>{`First name: ${dummyUser.first_name}`}</li>
                    <li>{`Last name: ${dummyUser.last_name}`}</li>
                    <li>{`Age: ${dummyUser.age}`}</li>
                    <li>{`Location: ${dummyUser.city}, ${dummyUser.state}, ${dummyUser.zipcode}`}</li>
                </ul>
            </div>

            <div className='match-preferences-options-container'>
                <h3>Connections match info</h3>
                <ul className='connectionInfoUL'>
                    <li>{`Height: ${dummyUser.height}`} inches</li>
                    <li>{`Body type: ${dummyUser.body_type}`}</li>
                    <li>{`Gender: ${dummyUser.gender}`}</li>
                    <li>{`Sexual orientation: ${dummyUser.sexual_orientation}`}</li>
                </ul>
            </div>

            <div className='bio-details-container'>
                <h3>My Bio</h3>
                <p>{dummyUser.bio}</p>

            </div>

            <div className='user-settings-container'>
                <DarkThemeToggleBtn darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <FontSizeSelection dummyUser={dummyUser} setDummyUser={setDummyUser} />
                <FontStyleSelection dummyUser={dummyUser} setDummyUser={setDummyUser} />
            </div>
        </div>
    )
}

export default MyProfile