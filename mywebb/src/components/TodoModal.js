import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const TaskModal = ({ modalIsOpen, closeModal, task }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Task Modal"
            className="modal"
            overlayClassName="modal-overlay"
        >   
            <div>
                <h2 className="modal-title">{task.title}</h2>
            </div>          
            <hr />
            <div className="modal-description-content">
                <p className="modal-description">{task.description}</p>
            </div>       
            <button className="modal-close-btn" onClick={closeModal}>Close</button>
        </Modal>
    );
};

export default TaskModal;