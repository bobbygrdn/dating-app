import React, { useContext } from 'react'
import DiscoverContext from '../../context/DiscoverContext'
import PendingContext from '../../context/PendingContext'

function Connection (props) {

    const { singleUser, addSingleUser, setClickedUser } = useContext(DiscoverContext)
    const { setConnectModal } = useContext(PendingContext)
    /* It fetches a user from the database and then adds that user to the state. */
    const handleClick = (e) =>{
        fetch(`https://find-luv.herokuapp.com/api/users/${e.target.id}`)
        .then(response => response.json())
        .then(data => addSingleUser(data))
        if(singleUser !== null) {
            setConnectModal(true)
            setClickedUser(e.target.id)
        }
    }
    return (
        <div className='connection' onClick={handleClick} id={props.elem.user_id}>
            <img
            src={props.elem.profile_pic_url}
            alt=""
            className='profilePics' />
            <h5>{props.elem.first_name}, {props.elem.age}</h5>
            <h6>Zipcode: {props.elem.zipcode}</h6>
        </div>
    )
}

export default Connection