import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Form.css';

const OfferForm = ({ onClose, offer, onSubmit }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: offer.price,
  });

  const [phoneNumberValid, setPhoneNumberValid] = useState(false);

  useEffect(() => {
    setPhoneNumberValid(/^07\d{8}$/.test(formData.phoneNumber));
  }, [formData.phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Offer Form</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="mb-3">
          <img src="safaricon.png" alt="Offer" className="img-fluid" />
        </div>
        <div className="form-group mb-3">
          <label>Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your Safaricom phone number (e.g., 07XXXXXXXX)"
          />
        </div>
        <div className="form-group mb-3">
          <label>Amount:</label>
          <input
            type="text"
            className="form-control"
            name="amount"
            value={formData.amount}
            disabled
          />
        </div>
        <p className="mt-3">Thank you for trusting our service.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={!phoneNumberValid} 
          className={!phoneNumberValid ? 'disabled-button' : ''}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OfferForm;

