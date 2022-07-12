import React from 'react'

function FontSizeSelection() {
    return (
        <div className='fontSizeSelectionContainer'>
            <select className='fontSizeDropDown'>
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
            </select>
        </div>
    )
}

export default FontSizeSelection