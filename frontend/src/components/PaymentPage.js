import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const location = useLocation();
  const { item, quantity } = location.state || {};
  const navigate = useNavigate();

  // State to manage the address and phone number inputs
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!item) {
    return <div>No product selected for payment</div>;
  }

  const totalPrice = item.price * quantity;

  const handlePayment = async () => {
    // Validate input fields
    if (!address || !phoneNumber) {
      alert('Please fill in all the required fields (address and phone number).');
      return;
    }

    try {
      // Save the order in the backend after payment
      const orderData = {
        items: [{ productId: item._id, name: item.name, quantity, price: item.price }],
        totalAmount: totalPrice,
        address, // Address from input field
        telephone: phoneNumber, // Phone number
      };

      // Update the API endpoint to match your backend route
      await axios.post('http://localhost:5005/api/orders', orderData); // Ensure this route matches the backend
      alert('Payment Successful');
      console.log('Order Data:', orderData); // Check what you are sending

      // Redirect to order history page
      navigate('/orders'); 
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error.response?.data?.error || 'An error occurred'));
    }
  };

  return (
    <div>
      <h2>Payment for {item.name}</h2>
      <p>Quantity: {quantity}</p>
      <p>Total Price: Rs {totalPrice}</p>
      
      {/* Add input fields for address and phone number */}
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

      <button onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
}

export default PaymentPage;
