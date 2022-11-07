import React, { useRef, useState } from "react";
import ReactDom from "react-dom";

const GlanceModal = ({ setShowGlanceModal, userData, changeUserData }) => {
  const [formData, setFormData] = useState({
    // username: userData.username,
    first_name: userData.first_name,
    last_name: userData.last_name,
    age: userData.age,
    city: userData.city,
    state: userData.state,
    zipcode: userData.zipcode
  });

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      return setShowGlanceModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUserData(formData)

    fetch(`https://find-luv.onrender.com/api/userdata/glance/${userData.user_id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .catch(err => console.log(err))

    setShowGlanceModal(false)

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
      <div className="editDataContainer editGlanceContainer">
        <form onSubmit={handleSubmit} className="updateUserDataForm">

          <div className="dataLabel">
            First name:
            <input
              className="userDataInputBox dataFirstName"
              type="text"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Last name:
            <input
              className="userDataInputBox dataLastName"
              type="text"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Age:
            <input
              className="userDataInputBox dataAge"
              type="text"
              name="age"
              onChange={handleChange}
              value={formData.age}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            City:
            <input
              className="userDataInputBox dataCity"
              type="text"
              name="city"
              onChange={handleChange}
              value={formData.city}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            State:
            <input
              className="userDataInputBox dataState"
              type="text"
              name="state"
              onChange={handleChange}
              value={formData.state}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Zip code:
            <input
              className="userDataInputBox dataZipcode"
              type="text"
              name="zipcode"
              onChange={handleChange}
              value={formData.zipcode}
              disabled />{" "}
          </div>

          <input type="submit" value="Update Glance info" id="editUserDataBtn" disabled />
        </form>

        <button
          className="modalCloseBtn"
          onClick={() => setShowGlanceModal(false)}
        >
          {" "}
          X{" "}
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default GlanceModal;
