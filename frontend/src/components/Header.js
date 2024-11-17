import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Badge, Button, Box, Container, Typography, Drawer, List, ListItem, ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milksubz-logo-lux.jpg';
import Login from './Login'; // Import the Login component


const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for Login modal
  const navigate = useNavigate();
  const theme = useTheme();

  // Media query for responsiveness (true for mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/', { replace: true });
  };

  const isLoggedIn = localStorage.getItem('token');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const drawerLinks = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/products" onClick={toggleDrawer}>
        <ListItemText primary="Shop" />
      </ListItem>
      <ListItem button component={Link} to="/contactus" onClick={toggleDrawer}>
        <ListItemText primary="Contact" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="fixed" elevation={4} sx={{ backgroundColor: '#16325B', color: '#fff', borderBottom: '1px solid #ddd' }}>
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
                marginRight: isMobile ? '20px' : '60px',
                marginLeft:'-220px'
              }}
            >
              <img
                src={logo}
                alt="MilkSubz Logo"
                style={{ height: '85px', width: 'auto' }}
              />
              <Typography
                variant="h6"
                sx={{
                  marginLeft: '10px',
                  fontWeight: 'bold',
                  color: '#FFF',
                  textDecoration: 'none',
                }}
              >
                MilkSubz
              </Typography>
            </Box>

            {/* Hamburger menu for mobile */}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={toggleDrawer}
                sx={{ marginLeft: 'auto' }}
              >
                <FaBars />
              </IconButton>
            )}

            {/* Navigation Links for larger screens */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <Button component={Link} to="/" color="inherit" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff', '&:hover': { backgroundColor: '#FFDC7F', color: '#16325B' } }}>
                  Home
                </Button>
                <Button component={Link} to="/products" color="inherit" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff', '&:hover': { backgroundColor: '#FFDC7F', color: '#16325B' } }}>
                  Shop
                </Button>
                <Button component={Link} to="/about" color="inherit" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff', '&:hover': { backgroundColor: '#FFDC7F', color: '#16325B' } }}>
                  AboutUs
                </Button>
                <Button component={Link} to="/contactus" color="inherit" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff', '&:hover': { backgroundColor: '#FFDC7F', color: '#16325B' } }}>
                  ContactUs
                </Button>
              </Box>
            )}

            {/* Icons Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px' ,marginRight:'-220px'}}>
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cartCount} color="success">
                  <FaShoppingCart />
                </Badge>
              </IconButton>
              {!isLoggedIn ? (
                <Button
                  onClick={handleLoginOpen} // Open the Login modal
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    px: 2,
                    fontSize: isMobile ? '12px' : '16px',
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
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    px: 3,
                    fontSize: isMobile ? '12px' : '16px',
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

      <Box sx={{ paddingTop: '70px' }}>
        {/* Other content goes here */}
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            padding: '20px',
            backgroundColor: '#16325B',
            color: '#fff',
          }}
        >
          {drawerLinks}
        </Box>
      </Drawer>

      <Login open={isLoginOpen} handleClose={handleLoginClose} />
    </>
  );
};

export default Header;
