import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faPhoneAlt, faGift, faTimes } from '@fortawesome/free-solid-svg-icons';
import './OfferPopup.css';
import OfferForm from './OfferForm';

const offers = [
    { id: 1, title: '10GB at Ksh 955 for 1 month', description: 'Enjoy 10GB of data for a full month.', price: '955', icon: faWifi },
    { id: 2, title: '8GB + 400 Minutes at Ksh 950', description: '8GB of data plus 400 minutes.', price: '950', icon: faWifi, icon2: faPhoneAlt },
    { id: 3, title: 'Airtel Airtime 1k at 880 Ksh', description: 'Get Airtel airtime worth 1000 Ksh at just 880 Ksh.', price: '880', icon: faPhoneAlt },
];

const OfferPopup = ({ onClose }) => {
    const [showOffers, setShowOffers] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleBuyNow = (offer) => {
        setSelectedOffer(offer);
    };

    const handleCloseForm = () => {
        setSelectedOffer(null);
    };

    const handleSubmitForm = (formData) => {
        const pin = window.prompt('Please enter your PIN');
        if (pin) {
            handlePinSubmit(pin, formData);
        }
    };

    const handlePinSubmit = (pin, formData) => {
        if (pin === '1234') {
            alert(`Purchase successful for ${selectedOffer.title} with phone number ${formData.phoneNumber}`);
            setSelectedOffer(null);
            onClose(); // Close the offer popup after successful purchase
        } else {
            alert('Invalid PIN');
        }
    };

    return (
        <div className="offer-popup">
            <div className="offer-popup-content">
                {!showOffers ? (
                    <>
                        <h3>Your Special Offers</h3>
                        <FontAwesomeIcon icon={faGift} size="3x" className="offer-icon" />
                        <button className="btn btn-primary mt-3" onClick={() => setShowOffers(true)}>Click Here</button>
                    </>
                ) : (
                    <>
                        <button className="btn-close" onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h3>New Offer Available!</h3>
                        <div className="row">
                            {offers.map(offer => (
                                <div key={offer.id} className="col-12 mb-4">
                                    <div className="card h-100 offer-card">
                                        <div className="card-body text-center">
                                            <FontAwesomeIcon icon={offer.icon} size="2x" className="mb-3" />
                                            {offer.icon2 && <FontAwesomeIcon icon={offer.icon2} size="2x" className="mb-3 ml-2" />}
                                            <h5 className="card-title">{offer.title}</h5>
                                            <p className="card-text">{offer.description}</p>
                                            <p className="card-text text-muted">Ksh. {offer.price}</p>
                                            <button className="btn btn-buy" onClick={() => handleBuyNow(offer)}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-primary btn-close-text" onClick={onClose}>Close</button>
                    </>
                )}
            </div>
            {selectedOffer && (
                <OfferForm
                    onClose={handleCloseForm}
                    offer={selectedOffer}
                    onSubmit={handleSubmitForm}
                />
            )}
        </div>
    );
};

export default OfferPopup;
