import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Button, Box, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milksubz-logo.jpg';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  // Media query for responsiveness (true for mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, [cartCount]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token');

  return (
    <>
      {/* Main Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#16325B', color: '#fff', borderBottom: '1px solid #ddd' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo Section */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginRight: isMobile ? '20px' : '60px', // Adjusted for mobile
              }}
            >
              <img
                src={logo}
                alt="MilkSubz Logo"
                style={{ height: '40px', width: 'auto' }} // Adjust the height and width as needed
              />
              <Typography
                variant="h6"
                sx={{
                  marginLeft: '10px', // Space between logo and text
                  fontWeight: 'bold',
                  color: '#FFF',
                  textDecoration: 'none',
                }}
              >
                MilkSubz
              </Typography>
            </Box>

            {/* Navigation Links for larger screens */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#FFDC7F',
                      color: '#16325B',
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/products"
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#FFDC7F',
                      color: '#16325B',
                    },
                  }}
                >
                  Shop
                </Button>
                <Button
                  component={Link}
                  to="/blog"
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#FFDC7F',
                      color: '#16325B',
                    },
                  }}
                >
                  Blog
                </Button>
                <Button
                  component={Link}
                  to="/contactus"
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#FFDC7F',
                      color: '#16325B',
                    },
                  }}
                >
                  Contact
                </Button>
              </Box>
            )}

            {/* Icons Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px' }}>
              <IconButton color="inherit">
                <FaSearch />
              </IconButton>
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cartCount} color="success">
                  <FaShoppingCart />
                </Badge>
              </IconButton>

              {/* Responsive login button */}
              {!isLoggedIn ? (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    px: 2,
                    fontSize: isMobile ? '12px' : '16px', // Adjust font size for mobile
                    backgroundColor: '#FFDC7F',
                    color: '#16325B',
                    '&:hover': {
                      backgroundColor: '#78B7D0',
                    },
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="#16325B"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    px: 3,
                    fontSize: isMobile ? '12px' : '16px', // Adjust font size for mobile
                    backgroundColor: '#FFDC7F',
                    color: '#16325B',
                    '&:hover': {
                      backgroundColor: '#FFDC7F',
                    },
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
