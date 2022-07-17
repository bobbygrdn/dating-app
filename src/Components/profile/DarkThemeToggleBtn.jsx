import React from 'react'
import './DarkThemeToggleStyles.css'

function DarkThemeToggleBtn({ userData, changeUserData }) {

    const handleChange = (e) => {
        changeUserData({dark_theme: e.target.checked})

        fetch(`https://find-luv.herokuapp.com/api/userdata/darktheme/${userData.user_id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {dark_theme: e.target.checked} )
          })
          .catch(err => console.log(err))
    }


    return (
        <div className="toggleContainer">
            {'Dark Theme:'}{" "}

            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name={'darkTheme'} id={'darkTheme'} checked={userData.dark_theme} onChange={handleChange} />
                <label className="label" htmlFor={'darkTheme'}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>

        </div>
    )
}

export default DarkThemeToggleBtn