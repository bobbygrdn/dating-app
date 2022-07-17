import React, { useContext }from 'react'
import "../../ComponentStyles/Pending.css"
import LandingContext from '../../context/LandingContext'
import Connection from './Connection'

function PendingConnections() {

    const { userData } = useContext(LandingContext)
    let connectionsMap = [userData.liked]

    return (
        <div className='pending-connections-container'>
            <div className='connections-container'>
                {connectionsMap.map((elem) => {
                return (
                    <Connection elem={elem} key={elem.user_id} />
                    )
                })}
            </div>
        </div>
    )
}

export default PendingConnections