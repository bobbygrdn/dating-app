import React from 'react'
import User from './User';

function Users(props) {
    console.log(props.users);
    if(props.users !== null) {
        return (
        <div>
            {props.users.data.map((elem) => {
                return (
                    <User elem={elem} key={elem.user_id} />
                )
            })}
        </div>
    )}
}

export default Users