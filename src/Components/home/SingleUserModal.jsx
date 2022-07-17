import { useContext, useEffect} from "react"
import DiscoverContext from "../../context/DiscoverContext"
import '../../ComponentStyles/Discover.css'
import LandingContext from "../../context/LandingContext"

function SingleUserModal({ show, darkTheme }) {
    /* Destructuring the context object. */
    const { singleUser, setSingleModal, likeUser, setClickedUser, clickedUser } = useContext(DiscoverContext)

    const { userData } = useContext(LandingContext)
    
    /**
     * When the user clicks the close button, the modal will close and the clicked user will be set to
     * null.
     */
    const closeModal = () => {
        setSingleModal(false)
        setClickedUser(null)
    }

    const runLikeUser = () => {
        likeUser({
            user_id: userData.user_id,
            profile_pic_url: userData.profile_pic_url,
            first_name: userData.first_name,
            age: userData.age,
            zipcode: userData.zipcode
        }, clickedUser)
    }

    
    /* Checking to see if the show prop is true or false. If it is true, then it will add the class
    singleUserModalDarkTheme to the singleUserModal element. If it is false, then it will remove the
    class singleUserModalDarkTheme from the singleUserModal element. */
    useEffect(() => {
      checkForDarkTheme()
    },[show])

    /**
     * If darkTheme is true, add the class singleUserModalDarkTheme to the singleUserModal element.
     * If darkTheme is false, remove the class singleUserModalDarkTheme from the singleUserModal
     * element.
     * @returns the classList.add or classList.remove method.
     */
    const checkForDarkTheme = () => {
        let singleUserModal = document.querySelector('.singleUserModal')
      if(darkTheme && singleUserModal) {
    return singleUserModal.classList.add('singleUserModalDarkTheme')
      }
      if(!darkTheme && singleUserModal){
       return singleUserModal.classList.remove('singleUserModalDarkTheme')
      }
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
                            <button className="dislikeButton" onClick={closeModal}>No</button> <button className="likeButton" onClick={runLikeUser}>Yes</button>
                        </div>
                    </div>
                </div>
                : null}

        </>
    )
}

export default SingleUserModal