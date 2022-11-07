import React, { useEffect } from 'react'

function FontSizeSelection({ userData, setUserData, changeUserData }) {

    const handleChange = (e) => {

        changeUserData({ [e.target.name]: e.target.value })
    }

    useEffect(() => {
        updateDataBaseFontSize(userData.font_size)
    }, [userData.font_size])

    const updateDataBaseFontSize = (fontSize) => {

        fetch(`https://find-luv.onrender.com/api/userdata/fontsize/${userData.user_id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ font_size: fontSize })
        })
            .catch(err => console.log(err))
    }

    return (
        <div className='fontSizeSelectionContainer'>
            <label>Font Size: </label>
            <select className='fontSizeDropDown'
                value={userData['font_size']}
                onChange={handleChange}
                name="font_size">
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
            </select>
        </div >
    )
}

export default FontSizeSelection