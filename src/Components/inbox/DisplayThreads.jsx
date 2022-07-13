import React, { useEffect } from 'react'

function DisplayThreads({ arrayOfProfiles }) {
    console.log(arrayOfProfiles)

    useEffect(() => {
        test()
    }, [arrayOfProfiles])

    function test() {
        return (
            <>
                {arrayOfProfiles.map((elem) => (
                    <div className='threadCard'>
                        <img src={elem.profile_pic_url} alt="thread-card-pic" />
                    </div>
                ))}

            </>
        );
    }


}


export default DisplayThreads