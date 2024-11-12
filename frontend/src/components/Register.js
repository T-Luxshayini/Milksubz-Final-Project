import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link, Grid } from '@mui/material';
import Image4 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/best-and-worst-milk-for-heart-health-alt-1440x810.jpg';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
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
        borderRadius: '20px',
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
          opacity: 0.75,
          borderRadius: '20px',
          zIndex: -1,
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
            maxWidth: 600,
            p: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h4" gutterBottom color='#16325B' fontWeight='bold'>
            Create an Account
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
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
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#FFDC7F',color:'#16325B',borderRadius:'50px', mt: 2, '&:hover': { backgroundColor: '#41B3A2' } }}
          >
            Register
          </Button>

          <Typography align="center" color='#16325B' sx={{ mt: 2 }}>
            Already have an account?
            <Link href="#" underline="hover" color='#16325B' fontWeight='bold' onClick={() => navigate('/login')}>
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
