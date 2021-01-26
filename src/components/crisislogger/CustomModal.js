import React from 'react'
import Modal from 'react-bootstrap/Modal'
const CustomModal = ({ visible, body, header, buttons, onClose }) => {
    return (
        <Modal show={visible} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {buttons && buttons.map((button, index) => {
                    return (
                        <div key={index}>
                            {button}
                        </div>
                    )
                })
                }
            </Modal.Footer>
        </Modal>
    )
}
export default CustomModal