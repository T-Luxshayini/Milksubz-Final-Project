import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { clientSecret, totalAmount } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

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
      setSuccess(true);
      setLoading(false);
      alert("Payment Successful!");
      // navigate('/order-history');
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

  const inputBoxStyle = {
    border: '1px solid #ced4da',
    padding: '10px 12px',
    borderRadius: '4px',
    marginTop: '8px',
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      sx={{ maxWidth: 400, margin: '0 auto' }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Credit/Debit Card
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Cardholder Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <Box my={2}>
          <Typography variant="body1" gutterBottom>
            Card Number
          </Typography>
          <Box style={inputBoxStyle}>
            <CardNumberElement options={elementOptions} />
          </Box>
        </Box>

        <Box display="flex" gap={2} mt={2}>
          <Box flex={1}>
            <Typography variant="body1" gutterBottom>
              Expiration Date
            </Typography>
            <Box style={inputBoxStyle}>
              <CardExpiryElement options={elementOptions} />
            </Box>
          </Box>
          <Box flex={1}>
            <Typography variant="body1" gutterBottom>
              CVC
            </Typography>
            <Box style={inputBoxStyle}>
              <CardCvcElement options={elementOptions} />
            </Box>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!stripe || loading}
          sx={{ mt: 3 }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>

        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {success && <Typography color="success" mt={2}>Payment Successful!</Typography>}
      </form>
    </Box>
  );
};

export default PaymentForm;
