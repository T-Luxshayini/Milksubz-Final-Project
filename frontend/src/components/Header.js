import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaShoppingCart, FaMoneyCheckAlt } from 'react-icons/fa';
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart from local storage and set the count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    // Clear user token and cart from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

    // Redirect to the login page
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token'); // Check if the user is logged in

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f8f8f8', color: '#333' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: '#333', flexGrow: 1 }}
        >
          MilkSubz
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Button component={Link} to="/" color="inherit" startIcon={<FaHome />}>
            Home
          </Button>
          <Button component={Link} to="/products" color="inherit" startIcon={<FaBoxOpen />}>
            Products
          </Button>
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
          >
            <Badge badgeContent={cartCount} color="secondary">
              <FaShoppingCart />
            </Badge>
          </IconButton>
          {/* <Button component={Link} to="/payment-history" color="inherit" startIcon={<FaMoneyCheckAlt />}>
            Payment
          </Button> */}

          {!isLoggedIn ? (
            <>
              <Button component={Link} to="/login" color="inherit" startIcon={<RiLoginBoxLine />}>
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit" startIcon={<RiLoginBoxLine />}>
                Register
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              color="inherit"
              startIcon={<RiLogoutBoxLine />}
              sx={{
                backgroundColor: '#ff6347',
                '&:hover': {
                  backgroundColor: '#ff4500',
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
