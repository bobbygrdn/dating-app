import React from 'react'

function IndividualThread({ threads, profiles }) {
    const handleClick = (e) => {
        console.log(e.target.id)
        console.log(threads)
        console.log(profiles)
    }
    return (
        <>
            {threads.map((elem, index) => {

                return (
                    <div className='threadCard' key={index} id={elem.thread_id} onClick={handleClick} >
                        <img src={profiles[index].profile_pic_url} alt='thread-pic' />
                        <div className='thread-user-info'>
                            <h3>{profiles[index].first_name} {profiles[index].last_name}, {profiles[index].age}</h3>
                            <h5>{profiles[index].city}, {profiles[index].state}</h5>
                            <h6>{profiles[index].gender}, {profiles[index].body_type}</h6>
                        </div>


                    </div>
                )
            })
            }

        </>
    )
}

export default IndividualThread