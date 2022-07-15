import React, { useRef, useState } from 'react';
import ReactDom from "react-dom";

const MatchModal = ({ setShowMatchModal, userData }) => {

    const [formData, setFormData] = useState({
        height: userData.height,
        body_type: userData.body_type,
        gender: userData.gender,
        sexual_orientation: userData.sexual_orientation
    })

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowMatchModal(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
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

                    <div className='dataLabel'>Height:
                        <input
                            className="userDataInputBox"
                            type='text'
                            name='height'
                            onChange={handleChange}
                            value={formData.height} /></div>

                    <div className='dataLabel'>Body type:
                        <input
                            className="userDataInputBox"
                            type='text'
                            name='body_type'
                            onChange={handleChange}
                            value={formData.body_type} /> </div>

                    <div className='dataLabel'>Gender:
                        <input
                            className="userDataInputBox"
                            type='text'
                            name='gender'
                            onChange={handleChange}
                            value={formData.gender} /> </div>

                    <div className='dataLabel'>Sexual orientation:
                        <input
                            className="userDataInputBox"
                            type='text'
                            name='sexual_orientation'
                            onChange={handleChange}
                            value={formData.sexual_orientation} /> </div>

                    <input type='submit' value='Update Bio'
                        id='editUserDataBtn' />
                </form>

                <button className='modalCloseBtn' onClick={() => setShowMatchModal(false)}> X </button>
            </div>
        </div>,
        document.getElementById('portal')
    )

}

export default MatchModal