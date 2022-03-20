import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import './DeleteConfirmation.css'

const DeleteConfirmation = ({ modalVisible, showHideDeleteModal, id, handleDelete }) => {

  return (
    <Modal isOpen={ modalVisible } toggle={() => showHideDeleteModal()}>
    <ModalHeader>
      Are you sure you want to delete this item?
      <span onClick={ () => showHideDeleteModal() } className="modal-close-btn">X</span>
    </ModalHeader>
    <ModalBody>
      <button className='custom-btn btn--green' onClick={ () => handleDelete(id) }>Yes</button>
      <button className='red--btn custom-btn' onClick={() => showHideDeleteModal()}>Cancel</button>
    </ModalBody>
  </Modal>
  )
}

export default DeleteConfirmation