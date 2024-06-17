import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationPopup = ({ onClose, onConfirm, offer }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Purchase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to purchase {offer.title} for Ksh. {offer.price}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>No</Button>
        <Button variant="primary" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;

