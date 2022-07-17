import React from 'react'

function Connection (props) {


    return (
        <div className='connection' id={props.elem.user_id}>
            <img
            src={props.elem.profile_pic_url}
            alt=""
            className='profilePics' />
            <h5>{props.elem.first_name} {props.elem.age}</h5>
            <h6>{props.elem.zipcode}</h6>
        </div>
    )
}

export default Connection