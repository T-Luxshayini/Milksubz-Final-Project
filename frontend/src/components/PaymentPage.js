import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styled components for Payment Page
const PaymentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${require('/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milk.jpg')});
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const PaymentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const PaymentHeader = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  textarea {
    resize: none;
  }
`;

const ConfirmButton = styled.button`
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #63c5da;
  }
`;

function PaymentPage() {
  const location = useLocation();
  const { cart, totalAmount } = location.state || {};
  const navigate = useNavigate();

  // State to manage name, address, and phone number inputs
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!cart || cart.length === 0) {
    return <div>No items in the cart for payment</div>;
  }

  const validatePhoneNumber = (number) => {
    // Regex for validating Sri Lankan phone numbers (starts with 07 and has 8 digits after)
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(number);
  };

  const handlePayment = async () => {
    if (!name || !address || !phoneNumber) {
      alert('Please fill in all required fields (name, address, phone number).');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid Sri Lankan phone number (e.g., 0771234567).');
      return;
    }

    try {
      const orderData = {
        name,
        totalAmount,
        address,
        telephone: phoneNumber,
        // items: cart.map(item => ({
        //   productId: item.productId,
        //   quantity: item.quantity,
        // })),
      };

      // Send the order data to the backend
      const response = await axios.post('http://localhost:5005/api/orders', orderData);
      alert('Order saved successfully.');

      // Redirect the user to the payment link
      const paymentLink = "https://sandbox.payhere.lk/pay/o753126ca";
      window.location.href = paymentLink;

      // Redirect to orders after payment
      navigate('/orders'); 
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error.response?.data?.error || 'An error occurred'));
    }
  };

  return (
    <PaymentWrapper>
      <PaymentContainer>
        <PaymentHeader>Payment Summary</PaymentHeader>
        <p>Total Price: Rs {totalAmount}</p>

        <InputField>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </InputField>

        <InputField>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your address"
            rows="3"
          />
        </InputField>

        <InputField>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter your phone number (e.g., 0771234567)"
          />
        </InputField>

        <ConfirmButton onClick={handlePayment}>Confirm Order</ConfirmButton>
      </PaymentContainer>
    </PaymentWrapper>
  );
}

export default PaymentPage;
