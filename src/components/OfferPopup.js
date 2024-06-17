import React from 'react';
import './OfferPopup.css'; // Create OfferPopup.css for styling if needed

const OfferPopup = ({ onClose }) => {
  return (
    <div className="offer-popup">
      <div className="offer-popup-content">
        <h3>New Offer Available!</h3>
        <p>Details of the offer go here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OfferPopup;

