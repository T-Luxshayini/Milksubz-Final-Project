import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const location = useLocation();
  const { cart, totalAmount } = location.state || {};
  const navigate = useNavigate();

  // State to manage name, address, and phone number inputs
  const [name, setName] = useState(''); // New state for name
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!cart || cart.length === 0) {
    return <div>No items in the cart for payment</div>;
  }

  const handlePayment = async () => {
    // Validate input fields
    if (!name || !address || !phoneNumber) {
      alert('Please fill in all the required fields (name, address, and phone number).');
      return;
    }

    try {
      const orderData = {
        name, // Include the name here
        totalAmount, // Ensure this is calculated based on the cart items
        address,
        telephone: phoneNumber,
      };

      await axios.post('http://localhost:5005/api/orders', orderData);
      alert('Order saved successfully.');

      const paymentLink = "https://sandbox.payhere.lk/pay/o753126ca"; 
      window.open(paymentLink, "_blank"); 
      
      navigate('/orders'); // Optional: Redirect to order history or another page after payment
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error.response?.data?.error || 'An error occurred'));
    }
  };

  return (
    <div>
      <h2>Payment Summary</h2>
      <p>Total Price: Rs {totalAmount}</p>

      {/* Add input field for Name */}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </label>
      </div>

      {/* Existing input fields for address and phone number */}
      <div>
        <label>
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your address"
            rows="3"
          />
        </label>
      </div>

      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter your phone number"
          />
        </label>
      </div>

      <button onClick={handlePayment}>Confirm Order</button>
    </div>
  );
}

export default PaymentPage;
