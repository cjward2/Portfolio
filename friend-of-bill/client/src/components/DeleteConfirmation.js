import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ReactDOM from 'react-dom';
import './DeleteConfirmation.css'

const DeleteConfirmation = ({ modalVisible, showHideDeleteModal, id, handleDelete }) => {
  return ReactDOM.createPortal(
    <Modal isOpen={ modalVisible } toggle={ () => showHideDeleteModal() }>
    <ModalHeader>
      Are you sure you want to delete this item?
      <span onClick={ () => showHideDeleteModal() } className="modal-close-btn">x</span>
    </ModalHeader>
    <ModalBody>
    <button className='custom-btn btn--green' onClick={ () => handleDelete(id) }>Confirm</button>
    <button className='red--btn custom-btn' onClick={ () => showHideDeleteModal() }>Cancel</button> 
    </ModalBody>
  </Modal>, document.querySelector('body')
  );
}

export default DeleteConfirmation