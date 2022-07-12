import React from "react";


function DiscoverNavBarNumbers (props) {

    return (
    <div className="navNumbers" id={props.elem} onClick={props.handleClick}>{props.elem}</div>
    )
}

export default DiscoverNavBarNumbers