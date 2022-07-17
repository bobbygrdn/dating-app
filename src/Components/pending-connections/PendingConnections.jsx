import React, { useContext }from 'react'
import "../../ComponentStyles/Pending.css"
import LandingContext from '../../context/LandingContext'
import Connection from './Connection'

function PendingConnections() {

    const { userData } = useContext(LandingContext)

    return (
        <div className='pending-connections-container'>
            <div className='connections-container'>
                {/* {userData.liked.map((elem) => {
                return (
                    <Connection elem={elem} key={elem.user_id} />
                    )
                })} */}

                {userData.liked ?  userData.liked.map((elem) => {
                return (
                    <Connection elem={elem} key={elem.user_id} />
                    )
                }) : null}
                
            </div>
        </div>
    )
}

export default PendingConnections