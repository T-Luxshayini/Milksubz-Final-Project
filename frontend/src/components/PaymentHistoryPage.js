import React from 'react';

function PaymentHistoryPage() {
  const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

  return (
    <div>
      <h2>Payment History</h2>
      {paymentHistory.length > 0 ? (
        <ul>
          {paymentHistory.map((payment, index) => (
            <li key={index}>
              <p>Product: {payment.name}</p>
              <p>Quantity: {payment.quantity}</p>
              <p>Total Price: Rs {payment.totalPrice}</p>
              <p>Date: {payment.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments made yet.</p>
      )}
    </div>
  );
}

export default PaymentHistoryPage;
