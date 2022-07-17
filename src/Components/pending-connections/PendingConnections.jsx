import React, { useContext }from 'react'
import "../../ComponentStyles/Pending.css"
import DiscoverContext from '../../context/DiscoverContext'
import LandingContext from '../../context/LandingContext'
import Connection from './Connection'

function PendingConnections() {

    const { userData } = useContext(LandingContext)

    const clear = () => {
        let data = {
            liked: null
        }

        let fetchData ={
            method: "PATCH",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }

        fetch(`https://find-luv.herokuapp.com/api/liked/${userData.user_id}`, fetchData)
        .then(() => {
            console.log('Cleared the connections page!')
        })
        .catch(error => {
            console.error(error);
        })
    }

    console.log(userData.liked);
    return (
        <div className='pending-connections-container'>
            <div className='connections-container'>
                <button className='clearConnectionsButton' onClick={clear}>Clear</button>
                {/* {userData.liked ?  userData.liked.map((elem) => {
                return (
                    <Connection elem={elem} key={elem.user_id} />
                    )
                }) : null} */}

            </div>
        </div>
    )
}

export default PendingConnections