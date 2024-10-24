import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import milkImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/vecteezy_ai-generated-bottle-of-milk-and-basket-of-daisies_41323560.jpeg';

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
    const phoneRegex = /^07\d{8}$/; // Sri Lankan phone number validation
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
      };

      await axios.post('http://localhost:5005/api/orders', orderData);
      alert('Order saved successfully.');

      const paymentLink = "https://sandbox.payhere.lk/pay/o753126ca";
      window.location.href = paymentLink;

      navigate('/orders');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error.response?.data?.error || 'An error occurred'));
    }
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background Image with Light Opacity */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${milkImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
          zIndex: -1,
        }}
      />

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            p: 4,
            borderRadius: 2,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h4" gutterBottom align="center" color="#0D7C66">
            Payment Summary
          </Typography>
          <Typography variant="h6" gutterBottom align="center" color="#41B3A2" font-weight='bold'>
            Total Price: $ {totalAmount}
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#0D7C66' },
                '&:hover fieldset': { borderColor: '#0D7C66' },
                '&.Mui-focused fieldset': { borderColor: '#0D7C66' },
              },
              '& .MuiInputLabel-outlined': { color: '#0D7C66' },
            }}
          />

          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            multiline
            rows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#0D7C66' },
                '&:hover fieldset': { borderColor: '#0D7C66' },
                '&.Mui-focused fieldset': { borderColor: '#0D7C66' },
              },
              '& .MuiInputLabel-outlined': { color: '#0D7C66' },
            }}
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter your phone number (e.g., 0771234567)"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#0D7C66' },
                '&:hover fieldset': { borderColor: '#0D7C66' },
                '&.Mui-focused fieldset': { borderColor: '#0D7C66' },
              },
              '& .MuiInputLabel-outlined': { color: '#0D7C66' },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#0D7C66', mt: 2, '&:hover': { backgroundColor: '#41B3A2' } }}
            onClick={handlePayment}
          >
            Confirm Order
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PaymentPage;



