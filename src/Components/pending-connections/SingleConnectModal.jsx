import React, { useContext, useEffect } from "react";
import LandingContext from "../../context/LandingContext";
import DiscoverContext from "../../context/DiscoverContext";
import PendingContext from "../../context/PendingContext";

function SingleConnectModal({ show }) {

    /* Destructuring the useContext hook. It is pulling the singleUser, setClickedUser, clickedUser,
    userData, setConnectModal, and connectUser from the DiscoverContext, LandingContext, and
    PendingContext. */
    const { singleUser, setClickedUser, clickedUser } = useContext(DiscoverContext)
    const { userData } = useContext(LandingContext)
    const { setConnectModal, connectUser } = useContext(PendingContext)

    /**
     * When the user clicks the close button, the modal will close and the clicked user will be set to
     * null.
     */
    const closeModal = () => {
        setConnectModal(false)
        setClickedUser(null)
    }

    /**
     * When the user clicks the button, the user_id of the user who clicked the button is passed to the
     * connectUser function along with the user_id of the user who's profile the user clicked the
     * button on.
     */
    const runLikeUser = () => {
        connectUser(userData.user_id, clickedUser)
    }

    /* Checking to see if the show prop is true or false. If it is true, then it will add the class
    singleUserModalDarkTheme to the singleUserModal element. If it is false, then it will remove the
    class singleUserModalDarkTheme from the singleUserModal element. */
    useEffect(() => {
        checkForDarkTheme()
    }, [show])

    /**
     * If darkTheme is true, add the class singleUserModalDarkTheme to the singleUserModal element.
     * If darkTheme is false, remove the class singleUserModalDarkTheme from the singleUserModal
     * element.
     * @returns the classList.add or classList.remove method.
     */
    const checkForDarkTheme = () => {
        let singleConnectModal = document.querySelector('.singleConnectModal')
        if (userData.dark_theme && singleConnectModal) {
            return singleConnectModal.classList.add('singleConnectModalDarkTheme')
        }
        if (!userData.dark_theme && singleConnectModal) {
            return singleConnectModal.classList.remove('singleUserModalDarkTheme')
        }
    }

    return (
        <>

            {/* A ternary operator. It is saying if show is true, then render the modal. If show is
            false, then render null. */}
            {show ?
                <div className="singleConnectContainer">
                    <div className="singleConnectModal">
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


                        <div className="footer">
                            <button className="dislikeButton" onClick={closeModal} disabled>No</button> <button className="likeButton" onClick={runLikeUser} disabled>Yes</button>
                        </div>
                    </div>
                </div>
                : null}

        </>
    )
}

export default SingleConnectModal