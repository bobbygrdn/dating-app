import React, { useRef, useState } from "react";
import ReactDom from "react-dom";

const LoginSettingsModal = ({ setShowLoginSettingsModal, userData, changeUserData }) => {
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    verifyPassword: userData.password
  });

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      return setShowLoginSettingsModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.verifyPassword) return alert('Passwords do not match!')

    let dataToUpdate = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    changeUserData(dataToUpdate)

    fetch(`https://find-luv.onrender.com/api/userdata/login/${userData.user_id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToUpdate)
    })
      .catch(err => console.log(err))
    setShowLoginSettingsModal(false)
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = (e) => {
    let passwordInputs = document.querySelectorAll('.dataPassword')
    passwordInputs.forEach(elem => elem.type = 'password')

    if (e.target.type === 'password') return e.target.type = 'text'
  }

  return ReactDom.createPortal(
    <div className="modalContainer" ref={modalRef} onClick={closeModal}>
      <div className="editDataContainer editLoginSettingsContainer">
        <form onSubmit={handleSubmit} className="updateUserDataForm">

          <div className="dataLabel">
            Username:
            <input
              className="userDataInputBox dataUsername"
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              onClick={handleClick}

              disabled />
          </div>

          <div className="dataLabel">
            Email:
            <input
              className="userDataInputBox dataEmail"
              type="text"
              name="email"
              onChange={handleChange}
              value={formData.email}
              onClick={handleClick}

              disabled />
          </div>

          <div className="dataLabel">
            Current password:
            <input
              className="userDataInputBox dataPassword"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              onClick={handleClick}
              disabled />{" "}
          </div>

          <div className="dataLabel">
            Verify password:
            <input
              className="userDataInputBox dataPassword"
              type="password"
              name="verifyPassword"
              onChange={handleChange}
              value={formData.verifyPassword}
              onClick={handleClick}

              disabled />{" "}
          </div>

          <input type="submit" value="Update Login settings" id="editUserDataBtn" onClick={handleClick} disabled />
        </form>

        <button
          className="modalCloseBtn"
          onClick={() => setShowLoginSettingsModal(false)}
        >
          {" "}
          X{" "}
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default LoginSettingsModal;
