import React, { useEffect } from 'react'

function FontSizeSelection({ userData, setUserData }) {

    const handleChange = (e) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    useEffect(() => {
        changeFontSize()
    }, [userData['font_size']])

    const changeFontSize = () => {
        let body = document.querySelector('body')

        switch (userData['font_size']) {
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