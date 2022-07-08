import React from "react";

function User (props) {
    return (
        <div className="user">
            <img 
            src={props.elem.profile_pic_url} 
            alt=''
            className="profilePics" />
            <h5>{props.elem.first_name}, {props.elem.age}</h5>
            <h5>Distance: </h5>
        </div>
    )
}

export default User