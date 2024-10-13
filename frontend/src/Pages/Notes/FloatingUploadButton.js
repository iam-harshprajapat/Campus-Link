import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import UploadNotes from './UploadNotes'; // The component containing the upload form
import { IoIosAdd } from "react-icons/io";

const FloatingUploadButton = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            {/* Floating Plus Button */}
            <button
                style={{
                    position: 'fixed',
                    bottom: '6%',
                    right: '3%',
                    borderRadius: '50%',
                    backgroundColor: '#2B3467',
                    color: 'white',
                    border: 'none',
                    width: '60px',
                    height: '60px',
                    fontSize: '40px',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                onClick={handleShow}
            >
                <IoIosAdd />
            </button>

            {/* Modal for Upload Note */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UploadNotes closeModal={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FloatingUploadButton;
