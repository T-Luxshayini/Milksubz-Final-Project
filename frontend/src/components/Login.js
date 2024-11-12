import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Grid } from '@mui/material';
import Image4 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/best-and-worst-milk-for-heart-health-alt-1440x810.jpg';

function Login() {
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

      // Create a user object that includes the email explicitly
    const userWithEmail = {
      id: response.data.user.id,
      username: response.data.user.username,
      role: response.data.user.role,
      email: email  // Add the email from the form
    };
      // Log everything to verify
    console.log('Email being stored:', email);
    console.log('Enhanced user object:', userWithEmail);
    console.log('Local Storage after saving:', localStorage.getItem('user'));
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userWithEmail));

      // Get user data from localStorage to verify what was stored
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored User Data:', storedUser);
      
      
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
    } catch (error) {
      console.error('Login failed:', error.response.data);
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
        borderRadius: '20px', // Rounded corners for the background image
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Light Opacity and Rounded Corners */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${Image4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75, // Light reduction in opacity for the background image
          borderRadius: '20px', // Apply curved corners to the background image
          zIndex: -1, // Keep the image behind the form
        }}
      />

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 600, // Form size
            p: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly transparent form background
            borderRadius: 2,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h4" gutterBottom color='#16325B' fontWeight='bold'>
            Welcome back!
          </Typography>
          <Typography variant="subtitle1" gutterBottom color='#78B7D0' fontWeight='bold'>
            Enter your credentials to access your account
          </Typography>
          <TextField
            label="Email address"
            type="email"
            variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#16325B',
                    },
                    '&:hover fieldset': {
                      borderColor: '#16325B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#16325B',
                    },
                  },
                  '& .MuiInputLabel-outlined': {
                    color: '#16325B',
                  },
                }}
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#16325B',
                    },
                    '&:hover fieldset': {
                      borderColor: '#16325B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#16325B',
                    },
                  },
                  '& .MuiInputLabel-outlined': {
                    color: '#78B7D0',
                  },
                }}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" color='#78B7D0' fontWeight='bold'>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
              label="Remember for 30 days"
            />
            <Link href="#" underline="hover" color='#78B7D0' fontWeight='bold'>
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#FFDC7F',color:'#16325B', mt: 2,borderRadius:'50px', '&:hover': { backgroundColor: '#41B3A2' } }}
          >
            Login
          </Button>

          <Typography align="center" color='#16325B' sx={{ mt: 2 }}>
            Don’t have an account?
            <Link href="#" underline="hover" color='#16325B' fontWeight='bold' onClick={() => navigate('/register')}>
              Register
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
