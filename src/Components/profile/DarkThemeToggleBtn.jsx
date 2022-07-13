import React, { useEffect } from 'react'
import './DarkThemeToggleStyles.css'

function DarkThemeToggleBtn({ darkTheme, setDarkTheme }) {

    useEffect(() => {
        if (darkTheme) {
            document.querySelector('body').classList.add('darkTheme')
            document.querySelector('.navbar-container').classList.add('navDarkTheme')
        }
        if (!darkTheme) {
            document.querySelector('body').classList.remove('darkTheme')
            document.querySelector('.navbar-container').classList.remove('navDarkTheme')
        }
    }, [darkTheme])

    const handleChange = (e) => {
        setDarkTheme(e.target.checked)
    }


    return (
        <div className="toggleContainer">
            {'Dark Theme:'}{" "}

            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name={'darkTheme'} id={'darkTheme'} checked={darkTheme} onChange={handleChange} />
                <label className="label" htmlFor={'darkTheme'}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>

        </div>
    )
}

export default DarkThemeToggleBtn