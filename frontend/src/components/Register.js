// File: /src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, Box, TextField, Button, Typography } from '@mui/material';

const Register = ({ open, handleClose, openLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      handleClose();
      openLogin(); // Switch to Login modal on successful registration
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #16325B, #78B7D0)', // Same gradient background as Login
          backdropFilter: 'blur(5px)',
          color: '#fff',
          borderRadius: '10px',
        },
      }}
    >
      <DialogContent
        sx={{
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h5" gutterBottom color="#fff" fontWeight="bold">
          Create an Account
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="#DFF6FF">
          Fill in your details to register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#DFF6FF' },
                '&.Mui-focused fieldset': { borderColor: '#DFF6FF' },
              },
              '& .MuiInputLabel-outlined': { color: '#DFF6FF' },
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#DFF6FF' },
                '&.Mui-focused fieldset': { borderColor: '#DFF6FF' },
              },
              '& .MuiInputLabel-outlined': { color: '#DFF6FF' },
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#DFF6FF' },
                '&.Mui-focused fieldset': { borderColor: '#DFF6FF' },
              },
              '& .MuiInputLabel-outlined': { color: '#DFF6FF' },
            }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#DFF6FF' },
                '&.Mui-focused fieldset': { borderColor: '#DFF6FF' },
              },
              '& .MuiInputLabel-outlined': { color: '#DFF6FF' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#DFF6FF' },
                '&.Mui-focused fieldset': { borderColor: '#DFF6FF' },
              },
              '& .MuiInputLabel-outlined': { color: '#DFF6FF' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#FFDC7F',
              color: '#16325B',
              borderRadius: '20px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#145DA0', color: '#fff' },
            }}
          >
            Register
          </Button>
          <Typography align="center" color="#DFF6FF" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                openLogin(); // Switch back to Login modal
              }}
              sx={{ fontWeight: 'bold', textTransform: 'none', color: '#fff' }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
