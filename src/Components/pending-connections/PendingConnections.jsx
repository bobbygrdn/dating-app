import React, { useContext, useEffect }from 'react'
import "../../ComponentStyles/Pending.css"
import LandingContext from '../../context/LandingContext'
import Connection from './Connection'
import PendingContext from '../../context/PendingContext'
import SingleConnectModal from './SingleConnectModal'
import NoConnections from './NoConnections'

function PendingConnections() {

    /* It's destructuring the data from the LandingContext and PendingContext. */
    const { userData } = useContext(LandingContext)
    const { pending, setPending, singleConnectModal } = useContext(PendingContext)

    /* Fetching the data from the API and setting the state of pending to the data. */
    useEffect(()=> {
        
        fetch(`https://find-luv.herokuapp.com/api/pending/${userData.liked}`)
        .then(response => response.json())
        .then(data => setPending(data))
    }, [])

    /**
     * It's a function that clears the connections page.
     */
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



    /* Checks the Pending state and returns the Connection & SingleConnectModal Components if not null. If Pending is null, it returns the No Connections Div */
    return (
        <>
        {!pending ? 
            <div className='pending-connections-container'>
                    <NoConnections />
            </div>
            :
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
        }
        </>
    )
}

export default PendingConnections