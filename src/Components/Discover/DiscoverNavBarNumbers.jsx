import React, { useContext } from "react";
import DiscoverContext from '../../context/DiscoverContext'

function DiscoverNavBarNumbers (props) {
    /* Destructuring the `updateIndexes` function from the `DiscoverContext` context. */
    const {updateIndexes} = useContext(DiscoverContext)

    /**
     * When the user clicks on a button, update the state of the app and scroll to the top of the page.
     */
    const handleClick = (e) => {
        updateIndexes(e.target.id)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
    <div className="navNumbers" id={props.elem} onClick={handleClick}>{props.elem}</div>
    )
}

export default DiscoverNavBarNumbers