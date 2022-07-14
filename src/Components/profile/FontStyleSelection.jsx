import React, { useEffect } from 'react'

function FontStyleSelection({ userData, setUserData }) {
    const handleChange = (e) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    useEffect(() => {
        changeFontStyle()
    }, [userData['font_style']])

    const changeFontStyle = () => {
        let body = document.querySelector('body')

        switch (userData['font_style']) {
            case 'Arial':
                body.style.fontFamily = 'Noto Serif'
                break;
            case 'Fantasy':
                body.style.fontFamily = 'Edu NSW ACT Foundation'
                break;
            case 'Georgia':
                body.style.fontFamily = 'Shadows Into Light'
                break;
            default:
                console.warn('Failed to load Font Style')
        }
    }
    return (
        <div className='fontStyleContainer'>
            <label>Font Style: </label>

            <select className='fontStyleDropDown'
                value={userData['font_style']}
                onChange={handleChange}
                name="font_style"
            >
                <option value='Arial'>New Serif</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Georgia'>Child</option>
            </select>
        </div>
    )
}

export default FontStyleSelection