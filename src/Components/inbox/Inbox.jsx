import React from 'react'

function Inbox() {
    fetch('https://find-luv.herokuapp.com/api/threads')
        .then(res => res.json())
        .then(data => console.log(data))
    return (
        <div> - Inbox page WIP by Neo - </div>
    )
}

export default Inbox