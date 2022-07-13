import React from "react";


function DiscoverNavBarNumbers (props) {

    const handleClick = (e) => {
        console.log(e.target.id);
    }

    return (
    <div className="navNumbers" id={props.elem} onClick={handleClick}>{props.elem}</div>
    )
}

export default DiscoverNavBarNumbers