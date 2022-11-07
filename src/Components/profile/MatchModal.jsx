import React, { useRef, useState } from "react";
import ReactDom from "react-dom";

const MatchModal = ({ setShowMatchModal, userData, changeUserData }) => {
  const [formData, setFormData] = useState({
    height: userData.height,
    body_type: userData.body_type,
    gender: userData.gender,
    sexual_orientation: userData.sexual_orientation,
    gender_preference: userData.gender_preference,
    age1: userData.age1,
    age2: userData.age2,
  });

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      return setShowMatchModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUserData(formData)
    fetch(`https://find-luv.onrender.com/api/userdata/connection-match/${userData.user_id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    setShowMatchModal(false)
  };

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
      <div className="editDataContainer matchDataContainer">
        <form onSubmit={handleSubmit} className="updateUserDataForm">
          <div className="dataLabel">
            Height:
            <input
              className="userDataInputBox dataHeight"
              type="text"
              name="height"
              onChange={handleChange}
              value={formData.height}
              disabled />
          </div>

          <div className="dataLabel">
            Body type:
            <input
              className="userDataInputBox dataBodyType"
              type="text"
              name="body_type"
              onChange={handleChange}
              value={formData.body_type}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Gender:
            <input
              className="userDataInputBox dataGender"
              type="text"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Sexual orientation:
            <input
              className="userDataInputBox"
              type="text"
              name="sexual_orientation"
              onChange={handleChange}
              value={formData.sexual_orientation}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Gender preference:
            <input
              className="userDataInputBox"
              type="text"
              name="gender_preference"
              onChange={handleChange}
              value={formData.gender_preference}
              disabled />{" "}
          </div>
          <div className="dataLabel">
            Preferred age:
            <input
              className="userDataInputBox dataAgeRange"
              type="number"
              name="age1"
              onChange={handleChange}
              value={formData.age1}
              disabled />{" to "}
            <input
              className="userDataInputBox dataAgeRange"
              type="number"
              name="age2"
              onChange={handleChange}
              value={formData.age2}
              disabled />

          </div>

          <input type="submit" value="Update Match info" id="editUserDataBtn" disabled />
        </form>

        <button
          className="modalCloseBtn"
          onClick={() => setShowMatchModal(false)}
        >
          {" "}
          X{" "}
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default MatchModal;
