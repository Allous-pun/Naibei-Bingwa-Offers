import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PinPopup = ({ onClose, onSubmit }) => {
  const [pin, setPin] = useState('');

  const handlePinSubmit = (event) => {
    event.preventDefault();
    onSubmit(pin);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter PIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePinSubmit}>
          <div className="form-group">
            <label>PIN:</label>
            <input
              type="password"
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <Button variant="primary" type="submit" className="mt-3">Submit</Button>
          <Button variant="secondary" onClick={onClose} className="mt-3">Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PinPopup;

