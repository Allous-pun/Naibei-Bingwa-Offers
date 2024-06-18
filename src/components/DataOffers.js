import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import './DataOffers.css';
import OfferForm from './OfferForm';
import ConfirmationPopup from './ConfirmationPopup';
import axios from 'axios'; // Import Axios for HTTP requests

const dataOffers = [
  { id: 1, category: 'Daily', title: '1 Hour Bundle', description: '1gb for one hour', price: '19' },
  { id: 2, category: 'Daily', title: '24 Hours Bundle', description: '1gb for 24 hours', price: '99' },
  { id: 3, category: 'Weekly', title: '7 Days Bundle', description: '350mbs for Seven Days', price: '50' },
  { id: 4, category: 'Monthly', title: '30 Days Bundle', description: '1.2gb for thirty Days', price: '250' },
  { id: 5, category: 'Daily', title: '3 Hours Bundle', description: '1.5gb for three hours', price: '49' },
  { id: 6, category: 'Daily', title: 'Bundle Till Midnight', description: '1.25gb till midnight bundle', price: '55' },
  { id: 7, category: 'Weekly', title: '7 Days Bundle', description: '6gb for Seven Days', price: '700' },
  { id: 8, category: 'Monthly', title: '30 Days Bundle', description: '2.5gb for Thirty Days', price: '500' },
  { id: 9, category: 'Monthly', title: '30 Days Bundle', description: '8gb + 400mins for Thirty Days', price: '955' },
  { id: 10, category: 'Monthly', title: '30 Days Bundle', description: '10gb for Thirty Days', price: '950' },
  { id: 11, category: 'Daily', title: '24 Hours Bundle', description: '250 for 24 Hours', price: '20' },
];

const DataOffers = () => {
  const [filter, setFilter] = useState('All');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const filteredOffers = filter === 'All' ? dataOffers : dataOffers.filter(offer => offer.category === filter);

  const handleBuyNow = (offer) => {
    setSelectedOffer(offer);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setShowForm(false);
    setProcessing(true);
    try {
      // Simulate transaction handling (replace with actual API call)
      const transactionResponse = await handleTransactionWithBackend(formData);
      
      // Assuming transactionResponse contains payment details or success/failure status
      console.log('Transaction Response:', transactionResponse);
      if (transactionResponse.success) {
        setShowConfirmation(true); // Show confirmation popup on successful transaction
      } else {
        setError('Transaction failed. Please try again.');
      }
    } catch (error) {
      setError('Error processing transaction. Please try again.');
      console.error('Transaction Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleConfirmPurchase = () => {
    setShowConfirmation(false);
    const pin = window.prompt('Please enter your PIN');
    if (pin) {
      handlePinSubmit(pin);
    }
  };

  const handlePinSubmit = (pin) => {
    // Simulate PIN verification
    if (pin === '1234') {
      alert(`Purchase successful for ${selectedOffer.title}`);
    } else {
      alert('Invalid PIN');
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
    <div className="container my-5">
      <h2 className="text-center">Data Offers</h2>
      <h3 className="text-center text-primary">With or Without Okoa</h3>
      <div className="d-flex justify-content-center mb-4">
        {['All', 'Daily', 'Weekly', 'Monthly'].map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`btn ${filter === category ? 'btn-primary' : 'btn-secondary'} mx-2`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="row">
        {filteredOffers.map(offer => (
          <div key={offer.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 offer-card">
              <div className="card-body text-center">
                <FontAwesomeIcon icon={faWifi} size="2x" className="mb-3" />
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">{offer.description}</p>
                <p className="card-text text-muted">Ksh. {offer.price}</p>
                <button className="btn btn-dark" onClick={() => handleBuyNow(offer)}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showForm && <OfferForm onClose={() => setShowForm(false)} offer={selectedOffer} onSubmit={handleFormSubmit} />}
      {showConfirmation && <ConfirmationPopup onClose={() => setShowConfirmation(false)} onConfirm={handleConfirmPurchase} offer={selectedOffer} />}
      {processing && <p className="text-center mt-3">Processing transaction...</p>}
      {error && <p className="text-center text-danger mt-3">{error}</p>}
    </div>
  );
};

export default DataOffers;

// Backend Tasks:
// 1. Implement endpoints to handle transaction requests from the frontend.
// 2. Integrate STK Push or payment gateway to process payments securely.
// 3. Configure CORS to allow requests from your Vercel-hosted React frontend.
// 4. Implement logic to handle transaction responses and update database accordingly.
// 5. Ensure proper error handling and logging for debugging purposes.
