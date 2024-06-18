import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faSms } from '@fortawesome/free-solid-svg-icons';
import './BingwaMinutesSMS.css';
import OfferForm from './OfferForm';
import ConfirmationPopup from './ConfirmationPopup';
import axios from 'axios'; // Import Axios for HTTP requests

const minutesOffers = [
    { id: 1, category: 'Hourly', title: '1 Hour Minutes', description: '34 minutes for one hour', price: '22' },
    { id: 2, category: 'Daily', title: 'Daily Minutes', description: '50 minutes till midnight', price: '52' },
    { id: 3, category: 'Weekly', title: 'Weekly Minutes', description: '200 minutes for seven days', price: '250' },
    { id: 4, category: 'Monthly', title: 'Monthly Minutes', description: '800 minutes + 1000 SMS for thirty days', price: '960' },
    { id: 6, category: 'Daily', title: 'Daily Minutes', description: '50 credo till midnight', price: '23' },
    { id: 7, category: 'Daily', title: 'Daily Minutes', description: '150 credo till midnight', price: '53' },
    { id: 8, category: 'Monthly', title: 'Monthly Minutes', description: '300 minutes + 500 SMS for thirty days', price: '490' },
];

const smsOffers = [
    { id: 1, category: 'Daily', title: 'Daily SMS', description: '20 SMS for 24 hours', price: '5' },
    { id: 2, category: 'Daily', title: 'Daily SMS', description: '200 SMS for 24 hours', price: '10' },
    { id: 3, category: 'Weekly', title: 'Weekly SMS', description: '100 SMS for Seven days', price: '18' },
    { id: 4, category: 'Weekly', title: 'Weekly SMS', description: '1000 SMS for Seven days', price: '30' },
    { id: 5, category: 'Monthly', title: 'Monthly SMS', description: '1500 SMS for thirty days', price: '100' },
    { id: 6, category: 'Monthly', title: 'Monthly SMS', description: '3500 SMS for thirty days', price: '201' },
];

const BingwaMinutesSMS = () => {
    const [minutesFilter, setMinutesFilter] = useState('All');
    const [smsFilter, setSmsFilter] = useState('All');
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offerType, setOfferType] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const filteredMinutesOffers = minutesFilter === 'All' ? minutesOffers : minutesOffers.filter(offer => offer.category === minutesFilter);
    const filteredSmsOffers = smsFilter === 'All' ? smsOffers : smsOffers.filter(offer => offer.category === smsFilter);

    const handleBuyNow = (offer, type) => {
        setSelectedOffer(offer);
        setOfferType(type);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedOffer(null);
        setOfferType('');
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
            <h2 className="text-center">Bingwa Minutes and SMS</h2>
            <div className="part-a my-4">
                <h3 className="text-center text-primary">Minutes</h3>
                <div className="d-flex justify-content-center mb-4">
                    {['All', 'Hourly', 'Daily', 'Weekly', 'Monthly'].map(category => (
                        <button 
                            key={category} 
                            onClick={() => setMinutesFilter(category)} 
                            className={`btn ${minutesFilter === category ? 'btn-primary' : 'btn-secondary'} mx-2`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="row">
                    {filteredMinutesOffers.map(offer => (
                        <div key={offer.id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 offer-card">
                                <div className="card-body text-center">
                                    <FontAwesomeIcon icon={faPhoneAlt} size="2x" className="mb-3" />
                                    <h5 className="card-title">{offer.title}</h5>
                                    <p className="card-text">{offer.description}</p>
                                    <p className="card-text text-muted">Ksh. {offer.price}</p>
                                    <button className="btn btn-dark" onClick={() => handleBuyNow(offer, 'minutes')}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="part-b my-4">
                <h3 className="text-center text-primary">SMS</h3>
                <div className="d-flex justify-content-center mb-4">
                    {['All', 'Daily', 'Weekly', 'Monthly'].map(category => (
                        <button 
                            key={category} 
                            onClick={() => setSmsFilter(category)} 
                            className={`btn ${smsFilter === category ? 'btn-primary' : 'btn-secondary'} mx-2`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="row">
                    {filteredSmsOffers.map(offer => (
                        <div key={offer.id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 offer-card">
                                <div className="card-body text-center">
                                    <FontAwesomeIcon icon={faSms} size="2x" className="mb-3" />
                                    <h5 className="card-title">{offer.title}</h5>
                                    <p className="card-text">{offer.description}</p>
                                    <p className="card-text text-muted">Ksh. {offer.price}</p>
                                    <button className="btn btn-dark" onClick={() => handleBuyNow(offer, 'sms')}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showForm && <OfferForm onClose={handleCloseForm} offer={selectedOffer} offerType={offerType} onSubmit={handleFormSubmit} />}
            {showConfirmation && <ConfirmationPopup onClose={() => setShowConfirmation(false)} onConfirm={handleConfirmPurchase} offer={selectedOffer} />}
            {processing && <p className="text-center mt-3">Processing transaction...</p>}
            {error && <p className="text-center text-danger mt-3">{error}</p>}
        </div>
    );
};

export default BingwaMinutesSMS;

// Backend Tasks:
// 1. Implement endpoints to handle transaction requests from the frontend, including STK push integration.
// 2. Integrate with payment gateway APIs (e.g., M-Pesa API) for processing mobile payments securely.
// 3. Implement logic to verify and validate transactions, handle responses, and update transaction status in the database.
// 4. Configure CORS settings to allow requests from your Vercel-hosted React frontend.
// 5. Ensure proper error handling, logging,
