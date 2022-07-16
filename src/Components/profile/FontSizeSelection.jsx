import React, { useEffect } from 'react'

function FontSizeSelection({ userData, setUserData, changeUserData }) {

    const handleChange = (e) => {
        // setUserData((prevData) => {
        //     return {
        //         ...prevData,
        //         [e.target.name]: e.target.value
        //     }
        // })
        changeUserData({[e.target.name]: e.target.value})
    }

    useEffect(() => {
        changeFontSize()
    }, [userData.font_size])

    const changeFontSize = () => {
        let body = document.querySelector('body')

        switch (userData.font_size) {
            case 'Small':
                body.style.fontSize = '.9rem'
                break;
            case 'Medium':
                body.style.fontSize = '1rem'
                break;
            case 'Large':
                body.style.fontSize = '1.1rem'
                break;
            default:
                console.warn('Failed to load Font size')
        }
    }

    const updateDataBaseFontSize = (fontSize) => {

        fetch(`https://find-luv.herokuapp.com/api/userdata/fontsize/${userData.user_id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {font_size :userData.font_size } )
          })
          .then(res => res.json())
          .then(data => console.log(data))
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