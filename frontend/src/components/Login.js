// File: /src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Checkbox, FormControlLabel, Typography, Dialog, DialogContent,
} from '@mui/material';

const Login = ({ open, handleClose, openRegister }) => {  // Receive openRegister as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/auth/login', { email, password });

      const userWithEmail = {
        id: response.data.user.id,
        username: response.data.user.username,
        role: response.data.user.role,
        email,
      };

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userWithEmail));

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      const userRole = response.data.user.role;
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/products');
      }
      handleClose(); // Close the modal on successful login
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #16325B, #78B7D0)',
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
          Welcome back!
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="#DFF6FF" fontWeight="bold">
          Enter your credentials to access your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email address"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                color="default"
              />
            }
            label="Remember me"
            sx={{ color: '#DFF6FF', fontWeight: 'bold' }}
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
            Login
          </Button>
          <Typography align="center" color="#DFF6FF" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                openRegister(); // Call openRegister to switch to Register modal
              }}
              sx={{ fontWeight: 'bold', textTransform: 'none', color: '#fff' }}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
