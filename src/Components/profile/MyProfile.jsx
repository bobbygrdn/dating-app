import React, { useContext, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import './profileStyles.css'
import DarkThemeToggleBtn from './DarkThemeToggleBtn.jsx'
import FontSizeSelection from './FontSizeSelection.jsx'
import FontStyleSelection from './FontStyleSelection.jsx'
import ProfilePicPlaceHolder from './ProfilePicPlaceHolder'
import LandingContext from '../../context/LandingContext'
import BioModal from './BioModal';
import GlanceModal from './GlanceModal';
import MatchModal from './MatchModal';

function MyProfile({ darkTheme, setDarkTheme }) {

    const { userData, setUserData } = useContext(LandingContext)
    const [showGlanceModal, setShowGlanceModal] = useState(false)
    const [showMatchModal, setShowMatchModal] = useState(false)
    const [showBioModal, setShowBioModal] = useState(false)
    const [showPicModal, setShowPicModal] = useState(false)

    const handleClick = (e) => {

        switch (e.currentTarget.id) {
            case 'bio':
                setShowBioModal(true)
                break;
            case 'glanceData':
                setShowGlanceModal(true)
                break;
            case 'matchData':
                setShowMatchModal(true)
                break;
            case 'profilePic':
                setShowPicModal(true)
                break;
            default:
                console.log('click')
        }
    }

    return (
        <div className='profile-page-main-container'>
            {showBioModal ? <BioModal setShowBioModal={setShowBioModal} userData={userData} /> : null}
            {showGlanceModal ? <GlanceModal setShowGlanceModal={setShowGlanceModal} userData={userData} /> : null}
            {showMatchModal ? <MatchModal setShowMatchModal={setShowMatchModal} userData={userData} /> : null}

            <div className='pic-container'>
                {userData !== null ? <img src={userData['profile_pic_url']} alt='profile-pic' /> : <ProfilePicPlaceHolder />}
                <FaRegEdit id="profilePic" className='editDataBtn editPicBtn' onClick={handleClick} />

            </div>

            <div className='snapshot-container'>
                <h3>At a glance <FaRegEdit id='glanceData' className='editDataBtn' onClick={handleClick} /></h3>
                <ul className='snapshotUL'>
                    <li>{`Username: ${userData.username}`}</li>
                    <li>{`First name: ${userData.first_name}`}</li>
                    <li>{`Last name: ${userData.last_name}`}</li>
                    <li>{`Age: ${userData.age == 0 ? 'not specified' : userData.age}`}</li>
                    <li>{`Location: ${userData.city}, ${userData.state}, ${userData.zipcode}`}</li>
                </ul>
            </div>

            <div className='match-preferences-options-container'>
                <h3>Connections match info <FaRegEdit id='matchData' className='editDataBtn' onClick={handleClick} /></h3>
                <ul className='connectionInfoUL'>
                    <li>{`Height: ${userData.height}`} inches</li>
                    <li>{`Body type: ${userData.body_type}`}</li>
                    <li>{`Gender: ${userData.gender}`}</li>
                    <li>{`Sexual orientation: ${userData.sexual_orientation}`}</li>
                </ul>
            </div>

            <div className='bio-details-container'>
                <h3>My Bio <FaRegEdit id='bio' className='editDataBtn' onClick={handleClick} /></h3>
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