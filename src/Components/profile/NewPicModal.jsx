import React, { useRef, useState } from "react";
import ReactDom from "react-dom";

const NewPicModal = ({ setShowPicModal, userData, changeUserData }) => {
  const [formData, setFormData] = useState({
    profile_pic_url: '',
    
  });

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      return setShowPicModal(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    let newPicFile = document.getElementById('newPicFile')

    const picFormData = new FormData();

    picFormData.append("image", newPicFile.files[0])

    fetch(`https://find-luv.herokuapp.com/image/${userData.user_id}`, {
        method: "post",
         body: picFormData
        })
        .then(()=> fetchProfilePic())
        .catch((error) => {console.log(error)})

    // changeUserData(formData)

    setShowPicModal(false)
  };

  const fetchProfilePic = () => {
    fetch(`https://find-luv.herokuapp.com/api/profilepic/${userData.user_id}`)
    .then(res=>res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
  
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };
  return ReactDom.createPortal(
    <div className="modalContainer" ref={modalRef} onClick={closeModal}>
      <div className="editDataContainer editProfilePicContainer">
        <form onSubmit={handleSubmit} className="updateUserDataForm" >
          <div className="dataLabel">
            Profile picture: 
            <input
            //   className="userDataInputBox "
            id="newPicFile"
              type="file"
              name="profile_pic_url"
              onChange={handleChange}
              value={formData.profile_pic_url}
            />
          </div>


          <input type="submit" value="Update Profile Pic" id="editUserDataBtn" />
        </form>

        <button
          className="modalCloseBtn"
          onClick={() => setShowPicModal(false)}
        >
          {" "}
          X{" "}
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default NewPicModal;
