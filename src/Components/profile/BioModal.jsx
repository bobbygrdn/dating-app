import React, { useRef, useState } from 'react';
import ReactDom from "react-dom";

const BioModal = ({ setShowBioModal, userData, changeUserData }) => {

    const [formData, setFormData] = useState({
        bio: userData.bio
    })

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowBioModal(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        changeUserData(formData)
        fetch(`https://find-luv.onrender.com/api/userdata/bio/${userData.user_id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .catch(err => console.log(err))
        setShowBioModal(false)
    }

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }
    return ReactDom.createPortal(

        <div className='modalContainer' ref={modalRef} onClick={closeModal}>

            <div className='editDataContainer'>

                <form onSubmit={handleSubmit} className='updateUserDataForm' >

                    <textarea
                        id='editDataTextArea'
                        className="textareaNewPost"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="7"
                        cols="40"
                        disabled />
                    <input type='submit' value='Update Bio'
                        id='editUserDataBtn' disabled />


                </form>
                <button className='modalCloseBtn' onClick={() => setShowBioModal(false)}> X </button>
            </div>
        </div>,
        document.getElementById('portal')
    )

}

export default BioModal