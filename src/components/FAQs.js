import React from 'react';

const faqs = [
    { question: 'What is Naibei-Bingwa Offers?', answer: 'Naibei-Bingwa Offers is a platform providing various special offers and promotions.' },
    { question: 'How can I avail an offer?', answer: 'You can avail an offer by clicking on the offer and following the instructions provided.' },
    { question: 'Are the offers time-bound?', answer: 'Yes, most offers are time-bound and have an expiry date mentioned.' },
    { question: 'Can I combine multiple offers?', answer: 'It depends on the terms and conditions of each offer. Please read the details before availing.' },
    { question: 'What if I face issues with an offer?', answer: 'You can contact our customer support for assistance with any issues related to the offers.' },
];

const FAQs = () => {
    return (
        <section>
            <h2>FAQs</h2>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;

