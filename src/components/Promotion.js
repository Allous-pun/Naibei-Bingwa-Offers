// src/components/Promotion.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Promotion = ({ onClose }) => {
  return (
    <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100 bg-dark bg-opacity-50">
      <div className="card text-center bg-warning p-4">
        <div className="card-body">
          <FontAwesomeIcon icon={faGift} size="3x" className="mb-3" />
          <h2 className="card-title">Special Promotion!</h2>
          <p className="card-text">Get 2.5GB for 30 days at Ksh. 500!</p>
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Promotion;

