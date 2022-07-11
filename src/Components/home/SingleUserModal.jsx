import { useContext } from "react"
import HomeContext from "../../context/HomeContext"
import '../../ComponentStyles/Discover.css'

function SingleUserModal({show}) {
    const {singleUser, setSingleModal} = useContext(HomeContext)

    const closeModal = () => {
        setSingleModal(false)
    }

    return (
        <>
          
            {show ? 
            <div className="singleUserContainer">
                <div className="singleUserModal"> 
                    <button className="closeButton" onClick={closeModal}>Close</button>

                    <div className="header">
                        <h2>{singleUser.first_name}, {singleUser.last_name}</h2> 
                    </div>  
                    
                    <div className="content">
                        <img 
                        src={singleUser.profile_pic_url} 
                        alt=''
                        className="singleUserPic" />
                        <div className="userInfo">
                            <h5>Age: {singleUser.age} Height: {singleUser.height}in. Body Type: {singleUser.body_type} </h5>
                            <h5>Gender: {singleUser.gender} Sexual Orientation: {singleUser.sexual_orientation}</h5> 
                            <h5>Location: {singleUser.city}, {singleUser.state}</h5>
                            <h5>Bio: {singleUser.bio}</h5>
                        </div>
                    </div>

                    <div className="footer">
                        <button className="dislikeButton" onClick={closeModal}>No</button> <button className="likeButton" onClick={closeModal}>Yes</button>
                    </div>
                </div> 
            </div>
            : null}
        
          
        </>
    )
}

export default SingleUserModal