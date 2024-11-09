import React, { useState } from 'react';
import { Question } from 'react-bootstrap-icons';
import { Modal } from 'react-bootstrap';
import styles from './HelpModal.module.css';

function HelpModal() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <button
                className="navIconModalToggleWrapper"
                onClick={handleShow}
            >
                <Question className='h5 m-0' />
            </button>

            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header className='border-0 me-3 mt-3' closeButton>
                    <Modal.Title className='bold px-3'>Help Topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3 px-3'>
                        <p className='mb-3'>Contextual help information</p>

                        {show && (
                            <video width="500" height="300" controls>
                                <source
                                    src={require('../../../common/assets/video/help/example.mp4')}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default HelpModal;