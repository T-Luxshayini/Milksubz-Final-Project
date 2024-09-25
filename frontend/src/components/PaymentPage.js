import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const { item, quantity } = location.state || {};
  const navigate = useNavigate();

  if (!item) {
    return <div>No product selected for payment</div>;
  }

  const totalPrice = item.price * quantity;

  const handleConfirmPayment = () => {
    // Retrieve existing payment history from localStorage
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

    // Add the new payment to the history
    const newPayment = {
      name: item.name,
      quantity,
      totalPrice,
      date: new Date().toLocaleString(),
    };
    
    paymentHistory.push(newPayment);

    // Save the updated payment history in localStorage
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));

    // Show success message
    alert('Payment Successful');

    // Redirect to the payment history page
    navigate('/payment-history');
  };

  return (
    <div>
      <h2>Payment for {item.name}</h2>
      <p>Quantity: {quantity}</p>
      <p>Total Price: Rs {totalPrice}</p>
      <button onClick={handleConfirmPayment}>Confirm Payment</button>
    </div>
  );
}

export default PaymentPage;
