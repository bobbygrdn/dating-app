import React, { useRef, useEffect, useState } from 'react'
import ReactDom from "react-dom";

function ThreadMsgModal({ setShowThreadMsgModal, displayedMessages, threadMsgUserInfo, userData }) {

    const [replyMsg, setReplyMsg] = useState({
        msgText: ''
    })

    useEffect(() => {
        console.log(displayedMessages)

        var elem = document.getElementById('msgDisplayBox');
        elem.scrollTop = elem.scrollHeight;
    }, [threadMsgUserInfo, setShowThreadMsgModal, displayedMessages])

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowThreadMsgModal(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // fetch(`https://find-luv.herokuapp.com/api/userdata/bio/${userData.user_id}`, {
        //     method: "PATCH",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        //   })
        //   .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setReplyMsg(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }
    return ReactDom.createPortal(

        <div className='modalContainer' ref={modalRef} onClick={closeModal}>

            <div className='msgThreadContainer'>
                <div className='threadModalHeader'>
                    <img className="msgMiniPic" src={threadMsgUserInfo.pic} alt='profile-pic' />
                    <p>{threadMsgUserInfo.name}</p>
                </div>
                <div id="msgDisplayBox" className='msgDisplayBox'>
                    {displayedMessages.map((elem, index) => {
                        console.log(elem)
                        return (
                            <div className={elem.sent_from_user_id === userData.user_id ? 'right' : 'left'}>
                                <div className='individualMsgDiv'>
                                    <p className='msgContent'>{elem.content}</p>
                                    <p className='msgDateTimeStamp'>{elem.date_stamp} {elem.time_stamp}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <form onSubmit={handleSubmit} className='replyMsgForm' >

                    <textarea
                        id='replyMsgTextArea'
                        className="textareaNewPost"
                        name="msgText"
                        value={replyMsg.msgText}
                        onChange={handleChange}
                        rows="3"
                        cols="40"
                    />
                    <input type='submit' value='Reply'
                        id='editDataSubmitBtn' />


                </form>
                <button className='modalCloseBtn' onClick={() => setShowThreadMsgModal(false)}> X </button>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ThreadMsgModal