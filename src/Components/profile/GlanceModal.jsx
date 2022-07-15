import React, { useRef, useState } from 'react';
import ReactDom from "react-dom";

const GlanceModal = ({ setShowGlanceModal, userData }) => {

    const [formData, setFormData] = useState({
        textContent: userData.bio
    })

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowGlanceModal(false)
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

                <form onSubmit={handleSubmit} >
                    <input type='submit' value='Update Bio'
                        id='editDataSubmitBtn' />
                    <textarea
                        id='editDataTextArea'
                        className="textareaNewPost"
                        name="textContent"
                        value={formData.textContent}
                        onChange={handleChange}
                        rows="7"
                        cols="40"
                    /> <br />


                </form>
                <button className='modalCloseBtn' onClick={() => setShowGlanceModal(false)}> X </button>
            </div>
        </div>,
        document.getElementById('portal')
    )

}

export default GlanceModal