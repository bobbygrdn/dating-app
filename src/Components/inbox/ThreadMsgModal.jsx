import React, { useRef, useEffect, useState } from 'react'
import ReactDom from "react-dom";

function ThreadMsgModal({ showThreadMsgModal, setShowThreadMsgModal, displayedMessages, threadMsgUserInfo, userData, fetchAllMsgsByThreadId }) {

    const [replyMsg, setReplyMsg] = useState({
        content: ''
    })

    useEffect(() => {
        var elem = document.getElementById('msgDisplayBox');
        elem.scrollTop = elem.scrollHeight;
    }, [threadMsgUserInfo, setShowThreadMsgModal, displayedMessages])

    useEffect(() => {

        getMsgs()
        const interval = setInterval(() => {
            getMsgs()
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    const getMsgs = () => {
        fetchAllMsgsByThreadId(threadMsgUserInfo.id)
    }

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowThreadMsgModal(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let date = new Date()
        let msgDateTime = date.toLocaleString()
        let threadId = displayedMessages[0].thread_id

        let sendingToUserId;
        if (displayedMessages[0].sent_from_user_id === userData.user_id) {
            sendingToUserId = displayedMessages[0].sent_to_user_id
        }
        else { sendingToUserId = displayedMessages[0].sent_from_user_id }


        let newMsg = {
            content: replyMsg.content,
            date_time_stamp: msgDateTime,
            read_receipt: false,
            sent_from_user_id: userData.user_id,
            sent_to_user_id: sendingToUserId
        }

        if (newMsg.content.length === 0) return alert('You forgot to type in your message!');

        fetch(`https://find-luv.herokuapp.com/api/messages/thread/${threadId}`, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMsg)
        })
            .then(res => res.json())
            .then(data => fetchAllMsgsByThreadId(threadId))
            .then(() => setReplyMsg({ content: '' })
            )
            .catch(err => console.log(err))


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
                    <img className="msgHeaderPic" src={threadMsgUserInfo.pic} alt='profile-pic' />
                    <p>{threadMsgUserInfo.name}</p>
                </div>
                <div id="msgDisplayBox" className='msgDisplayBox'>
                    {displayedMessages.map((elem, index) => {
                        return (
                            <>


                                <div key={index} className={elem.sent_from_user_id === userData.user_id ? 'right' : 'left'}>

                                    <div className='individualMsgDiv'>
                                        <p className='msgContent'>{elem.content}</p>
                                        <p className='msgDateTimeStamp'>{elem.date_time_stamp}</p>
                                    </div>
                                </div>

                                <img className={elem.sent_from_user_id === userData.user_id ? 'rightMiniPic' : 'leftMiniPic'} src={elem.sent_from_user_id === userData.user_id ? userData.profile_pic_url : threadMsgUserInfo.pic} alt='profile-pic' />
                            </>

                        )
                    })}

                </div>

                <form onSubmit={handleSubmit} className='replyMsgForm' >

                    <textarea
                        id='replyMsgTextArea'
                        className="textareaNewPost"
                        name="content"
                        value={replyMsg.content}
                        onChange={handleChange}
                        rows="3"
                        cols="40"
                    />
                    <input type='submit' value={`Reply to ${threadMsgUserInfo.name}`}
                        id='editDataSubmitBtn' />

                </form>
                <button className='modalCloseBtn' onClick={() => { setShowThreadMsgModal(false) }}> X </button>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ThreadMsgModal