import { useContext } from "react"
import DiscoverContext from "../../context/DiscoverContext"
import '../../ComponentStyles/Discover.css'

function SingleUserModal({ show }) {
    /* Destructuring the context object. */
    const { singleUser, setSingleModal } = useContext(DiscoverContext)

    /* When the user clicks the close button, the modal will close. */
    const closeModal = () => {
        setSingleModal(false)
    }

    return (
        <>

            {/* A ternary operator. It is saying if show is true, then render the modal. If show is
            false, then render null. */}
            {show ?
                <div className="singleUserContainer">
                    <div className="singleUserModal">
                        {/* Rendering a button that when clicked, will close the modal. */}
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

                        {/* Rendering two buttons. One button is a "No" button and the other is a "Yes"
                    button. When the user clicks the "No" button, the modal will close and the profile will not be added to their potential matches. When the user clicks the "Yes" button, the modal will close and the profile will be added to their potential matches. */}
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