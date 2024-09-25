import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const product = location.state ? location.state.product : null;

  return (
    <div>
      <h2>Payment Page</h2>
      {product ? (
        <div>
          <h3>Product: {product.name}</h3>
          <p>Price: ${product.price}</p>
          {/* You can integrate a payment gateway like Stripe or PayPal here */}
          <button onClick={() => alert('Payment Successful!')}>
            Confirm Payment
          </button>
        </div>
      ) : (
        <p>No product selected for payment</p>
      )}
    </div>
  );
}

export default PaymentPage;
