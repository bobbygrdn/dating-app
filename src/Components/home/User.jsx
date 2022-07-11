import React from "react";
import { useContext } from "react";
import DiscoverContext from "../../context/DiscoverContext";

function User (props) {

    const {addSingleUser, setSingleModal, singleUser} = useContext(DiscoverContext)
    
    const handleClick = (e) =>{
        fetch(`https://find-luv.herokuapp.com/api/users/${e.target.id}`)
        .then(response => response.json())
        .then(data => addSingleUser(data))
        if(singleUser !== null) {
            setSingleModal(true)
        }
    }

    

    return (
        <div className="user" onClick={handleClick} id={props.elem.user_id} >
            <img 
            src={props.elem.profile_pic_url} 
            alt=''
            className="profilePics" />
            <h5>{props.elem.first_name}, {props.elem.age}</h5>
            <h6> Miles Away</h6>
        </div>
    )
}

export default User