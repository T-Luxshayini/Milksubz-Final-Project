import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import milkImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/best-and-worst-milk-for-heart-health-alt-1440x810.jpg'; // Update with correct path
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QCqZPFDU5aLIEJODMXZ1TrGjcmBHwEJGA5ADUyKW34FJPqWV6PmWQSssWKcxTUDLvXMkNPqO70W5331MkiJYlFt00RIvqYIJJ');

function PaymentPage() {
  const location = useLocation();
  const { cart, totalAmount } = location.state || {};
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  if (!cart || cart.length === 0) {
    return <div>No items in the cart for payment</div>;
  }

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^07\d{8}$/; // Sri Lankan phone number validation
    return phoneRegex.test(number);
  };

  const handleOrderSubmit = async () => {
    if (!name || !lastname || !address || !phoneNumber) {
      setError('Please fill in all required fields (name, address, phone number).');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Sri Lankan phone number (e.g., 0771234567).');
      return;
    }

    try {
      const orderData = {
        name,
        lastname,
        address,
        telephone: phoneNumber,
        totalAmount: Math.round(totalAmount * 100), // Stripe requires amounts in cents
      };

      const response = await axios.post('http://localhost:5005/api/stripe/create-payment-intent', orderData);
      const { clientSecret, paymentId } = response.data;

      // Handle Stripe payment confirmation
      const cardElement = elements.getElement(CardNumberElement);
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSuccessMessage("Payment Successful! Thank you for your order.");
        console.log("Payment ID:", paymentId); // Log or store the payment ID
        // Optionally, you can save this paymentId in your database or state
        setLoading(false);
        // navigate('/orders'); // Redirect to orders page or any other page
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setError('Failed to create order. Please try again.');
    }
  };

  const elementOptions = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#424770',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <Grid container sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', zoom: 1.1 }}> {/* Add zoom here */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${milkImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.75, zIndex: -1 }} />
      <Grid item xs={12} md={8}>
        <Box sx={{ width: '100%', maxWidth: 900, backgroundColor: 'rgba(255, 255, 255, 0.85)', p: 4, borderRadius: 2, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' ,}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom align="center" color="#16325B">Payment Summary</Typography>
              <Typography variant="h6" gutterBottom align="center" color="#78B7D0" fontWeight="bold">Total Price: LKR {totalAmount}</Typography>
              <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField label="Last Name" variant="outlined" fullWidth margin="normal" value={lastname} onChange={(e) => setLastName(e.target.value)} required  />
              <TextField label="Address" variant="outlined" fullWidth margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} required multiline rows={3} />
              <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="Enter your phone number (e.g., 0771234567)" />
              
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom align="center" color="#16325B" marginTop={8}>Payment Method</Typography>
              <TextField label="Cardholder Name" variant="outlined" fullWidth margin="normal" />
              <Box my={2}>
                <Typography variant="body1" gutterBottom>Card Number</Typography>
                <Box style={{ border: '1px solid #ced4da', padding: '10px 12px', borderRadius: '4px', marginTop: '8px' }}>
                  <CardNumberElement options={elementOptions} />
                </Box>
              </Box>
              <Box display="flex" gap={2} mt={2}>
                <Box flex={1}>
                  <Typography variant="body1" gutterBottom>Expiration Date</Typography>
                  <Box style={{ border: '1px solid #ced4da', padding: '10px 12px', borderRadius: '4px', marginTop: '8px' }}>
                    <CardExpiryElement options={elementOptions} />
                  </Box>
                </Box>
                <Box flex={1}>
                  <Typography variant="body1" gutterBottom>CVC</Typography>
                  <Box style={{ border: '1px solid #ced4da', padding: '10px 12px', borderRadius: '4px', marginTop: '8px' }}>
                    <CardCvcElement options={elementOptions} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#FFDC7F', color: '#16325B', borderRadius: '50px', '&:hover': { backgroundColor: '#78B7D0' } }}
            onClick={handleOrderSubmit}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>

          {error && <Typography color="error" mt={2}>{error}</Typography>}
          {successMessage && <Typography color="#227B94" mt={2}>{successMessage}</Typography>} {/* Render success message */}
        </Box>
      </Grid>
    </Grid>
  );
}

export default PaymentPage;
