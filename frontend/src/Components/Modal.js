import React, { useEffect } from 'react'
import './Modal.css';

const Modal = ({ closeModal, children }) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        }
    }, [])
    return (
        <>
            <div className='model-wrapper' onClick={closeModal}></div>
            <div className='model-container'>
                {children}
            </div>
        </>
    )
}

export default Modal
