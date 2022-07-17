import React, { useRef, useEffect } from 'react'
import ReactDom from "react-dom";

function ThreadMsgModal({ setShowThreadMsgModal, displayedMessages }) {

    useEffect(() => {
        console.log(displayedMessages)
    }, [displayedMessages])

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowThreadMsgModal(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // changeUserData(formData)
        // fetch(`https://find-luv.herokuapp.com/api/userdata/bio/${userData.user_id}`, {
        //     method: "PATCH",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        //   })
        //   .catch(err => console.log(err))
        setShowThreadMsgModal(false)
    }

    const handleChange = (e) => {
        // setFormData(prevFormData => {
        //     return {
        //         ...prevFormData,
        //         [e.target.name]: e.target.value
        //     }
        // })
    }
    return ReactDom.createPortal(

        <div className='modalContainer' ref={modalRef} onClick={closeModal}>

            <div className='editDataContainer'>

                <form onSubmit={handleSubmit} className='updateUserDataForm' >

                    <textarea
                        id='editDataTextArea'
                        className="textareaNewPost"
                        name="bio"
                        // value={formData.bio}
                        onChange={handleChange}
                        rows="7"
                        cols="40"
                    />
                    <input type='submit' value='Update Bio'
                        id='editDataSubmitBtn' />


                </form>
                <button className='modalCloseBtn' onClick={() => setShowThreadMsgModal(false)}> X </button>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ThreadMsgModal