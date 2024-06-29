import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DataOffers from './components/DataOffers';
import BingwaMinutesSMS from './components/BingwaMinutesSMS';
import FAQs from './components/FAQs';
import OfferPopup from './components/OfferPopup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const handleCloseOfferPopup = () => {
    setShowOfferPopup(false);
    localStorage.setItem('lastOfferPopupTime', new Date().getTime());
  };

  useEffect(() => {
    const lastOfferPopupTime = localStorage.getItem('lastOfferPopupTime');
    const now = new Date().getTime();

    // Show popup if it hasn't been shown in the last 2 hours (7200 seconds)
    if (!lastOfferPopupTime || now - lastOfferPopupTime > 7200 * 1000) {
      setShowOfferPopup(true);
    }

    const interval = setInterval(() => {
      const lastOfferPopupTime = localStorage.getItem('lastOfferPopupTime');
      const currentTime = new Date().getTime();
      if (!lastOfferPopupTime || currentTime - lastOfferPopupTime > 7200 * 1000) {
        setShowOfferPopup(true);
        clearInterval(interval); // Clear the interval once the popup is shown
      }
    }, 1000 * 60 * 60 * 2); // Check every 2 hours

    return () => clearInterval(interval);
  }, []);

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
      </main>
      <Footer />
      {showOfferPopup && <OfferPopup onClose={handleCloseOfferPopup} />}
    </div>
  );
};

export default App;
