import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for HTTP requests
import './Form.css';

const OfferForm = ({ onClose, offer, onSubmit }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: offer.price,
  });

  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPhoneNumberValid(/^07\d{8}$/.test(formData.phoneNumber));
  }, [formData.phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumberValid) return;

    setProcessing(true);
    try {
      // Simulate fetching packages (replace with actual API call)
      const packages = await fetchPackagesFromBackend();

      // Assuming response is an array of packages from backend
      console.log('Packages:', packages);

      // Simulate transaction handling (replace with actual API call)
      const transactionResponse = await handleTransactionWithBackend(formData);

      // Handle successful transaction response
      console.log('Transaction Response:', transactionResponse);
      onSubmit(formData); // Submit form data to parent component after successful transaction
    } catch (error) {
      setError('Error processing transaction. Please try again.');
      console.error('Transaction Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const fetchPackagesFromBackend = async () => {
    // Example: Fetch packages from your Django backend using Axios
    try {
      const response = await axios.get('https://your-backend-api/packages');
      return response.data; // Return packages data from backend
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  };

  const handleTransactionWithBackend = async (formData) => {
    // Example: Handle transaction with your Django backend using Axios
    try {
      const response = await axios.post('https://your-backend-api/transaction', formData);
      return response.data; // Return transaction response from backend
    } catch (error) {
      console.error('Error handling transaction:', error);
      throw error;
    }
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
        {error && <p className="text-danger">{error}</p>}
        {processing ? (
          <p className="text-muted">Processing transaction...</p>
        ) : (
          <p className="mt-3">Thank you for trusting our service.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={processing}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!phoneNumberValid || processing}
          className={!phoneNumberValid ? 'disabled-button' : ''}
        >
          {processing ? 'Processing...' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OfferForm;

// Backend Tasks:
// 1. Implement endpoints to fetch packages and handle transactions.
// 2. Configure CORS to allow requests from your Vercel-hosted React frontend.
// 3. Define views in Django to handle GET requests for packages and POST requests for transactions.
// 4. Use appropriate authentication mechanisms (e.g., tokens, JWT) to secure API endpoints.
// 5. Implement logic to handle responses for fetching packages and processing transactions using Axios (or Django REST framework).
// 6. Ensure error handling and logging for debugging purposes.
