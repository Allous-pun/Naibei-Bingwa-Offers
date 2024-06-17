import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DataOffers from './components/DataOffers';
import BingwaMinutesSMS from './components/BingwaMinutesSMS';
import FAQs from './components/FAQs';
import Promotion from './components/Promotion'; // Import the Promotion component
import OfferPopup from './components/OfferPopup'; // Import the OfferPopup component
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [showPromotion, setShowPromotion] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const handleClosePromotion = () => {
    setShowPromotion(false);
    localStorage.setItem('lastPromotionTime', new Date().getTime());
  };

  useEffect(() => {
    const lastPromotionTime = localStorage.getItem('lastPromotionTime');
    const now = new Date().getTime();

    // Show promotion if it hasn't been shown in the last 30 seconds
    if (!lastPromotionTime || now - lastPromotionTime > 30 * 1000) {
      setShowPromotion(true);
    }

    // Set interval to check every 30 seconds
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (!lastPromotionTime || currentTime - lastPromotionTime > 30 * 1000) {
        setShowPromotion(true);
        localStorage.setItem('lastPromotionTime', currentTime);
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show offer pop-up after 30 seconds
    const timer = setTimeout(() => {
      setShowOfferPopup(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleCloseOfferPopup = () => {
    setShowOfferPopup(false);
    localStorage.setItem('lastOfferPopupTime', new Date().getTime());
  };

  return (
    <div className="App">
      <Header />
      <main>
        <section id="data-offers">
          <DataOffers />
        </section>
        <section id="bingwa-minutes-sms">
          <BingwaMinutesSMS />
        </section>
        <section id="faqs">
          <FAQs />
        </section>
        {showPromotion && <Promotion onClose={handleClosePromotion} />}
        {showOfferPopup && <OfferPopup onClose={handleCloseOfferPopup} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;

