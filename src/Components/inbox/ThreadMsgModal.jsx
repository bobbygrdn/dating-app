import React, { useRef } from 'react'
import ReactDom from "react-dom";

function ThreadMsgModal({ setShowThreadMsgModal }) {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            return setShowThreadMsgModal(false)
        }
    }

    return ReactDom.createPortal(
        <div ref={modalRef} onClick={closeModal} className='modalContainer'>ThreadMsgModal</div>, document.getElementById('portal')
    )
}

export default ThreadMsgModal