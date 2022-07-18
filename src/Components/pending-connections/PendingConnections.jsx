import React, { useContext, useEffect }from 'react'
import "../../ComponentStyles/Pending.css"
import LandingContext from '../../context/LandingContext'
import Connection from './Connection'
import PendingContext from '../../context/PendingContext'
import SingleConnectModal from './SingleConnectModal'


function PendingConnections() {

    const { userData } = useContext(LandingContext)
    const { pending, setPending, singleConnectModal } = useContext(PendingContext)

    useEffect(()=> {
        
        fetch(`http://localhost:8000/api/pending/${userData.liked}`)
        .then(response => response.json())
        .then(data => setPending(data))
    }, [setPending, userData.liked])

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

        fetch(`https://find-luv.herokuapp.com/api/connect/${userData.user_id}`, fetchData)
        .then(() => {
            console.log('Cleared the connections page!')
        })
        .catch(error => {
            console.error(error);
        })
    }



    return (
        <>
        {pending ? 
            <div className='pending-connections-container'>
            <button className='clearConnectionsButton' onClick={clear}>Clear</button>
                <div className='connections-container'>
                    {pending.map((elem) => {
                    return (
                        <div>
                            <Connection elem={elem} key={elem.user_id} />
                            <SingleConnectModal show={singleConnectModal} />
                        </div>
                        )
                    })}
                
                </div>
            </div>
            :
            <div className="noConnections">
                <p>You don't have any connections! Don't be shy, get out there and mingle!</p>
            </div>
            }
        </>
    )
}

export default PendingConnections