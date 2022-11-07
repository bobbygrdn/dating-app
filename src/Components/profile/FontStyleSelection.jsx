import React, { useEffect } from 'react'

function FontStyleSelection({ userData, changeUserData }) {
    const handleChange = (e) => {
        changeUserData({ [e.target.name]: e.target.value })
    }

    useEffect(() => {
        updateDataBaseFontStyle(userData.font_style)
    }, [userData.font_style])


    const updateDataBaseFontStyle = (fontStyle) => {

        fetch(`https://find-luv.onrender.com/api/userdata/fontstyle/${userData.user_id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ font_style: fontStyle })
        })
            .catch(err => console.log(err))
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
                <option value='Child'>Child</option>
            </select>
        </div>
    )
}

export default FontStyleSelection