import React, { useContext } from "react";
import DiscoverContext from '../../context/DiscoverContext'

function DiscoverNavBarNumbers (props) {
    const {updateIndexes} = useContext(DiscoverContext)

    const handleClick = (e) => {
        console.log(e.target.id);
        updateIndexes(e.target.id)
        window.scrollTo(0, 0)
    }

    return (
    <div className="navNumbers" id={props.elem} onClick={handleClick}>{props.elem}</div>
    )
}

export default DiscoverNavBarNumbers