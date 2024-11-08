import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        backgroundColor: '#16325B', // Main background color
        color: 'white',
        padding: '40px 20px',
        maxWidth: '100vw',
        width: '100%',
        // borderRadius: '40px', // Curved corners on all four sides
        overflow: 'hidden', // Ensures inner content doesn't overflow the rounded corners
        boxSizing: 'border-box',
      }}
    >
      {/* Top part of the footer with the links */}
      <Box
        sx={{
          backgroundColor: '#16325B', // Dark green for upper part
          padding: '40px 20px',
          maxWidth: '100vw',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              COMPANY INFORMATION
            </Typography>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link><br />
            <Link href="/environmental" color="inherit" underline="hover">
              Environmental
            </Link><br />
            <Link href="/cookie-policy" color="inherit" underline="hover">
              Cookie Policy
            </Link><br />
            <Link href="/privacy-policy" color="inherit" underline="hover">
              Privacy Policy
            </Link><br />
            <Link href="/affiliate-program" color="inherit" underline="hover">
              Affiliate Program
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              CUSTOMER SERVICES
            </Typography>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link><br />
            <Link href="/delivery-info" color="inherit" underline="hover">
              Delivery Information
            </Link><br />
            <Link href="/returns-policy" color="inherit" underline="hover">
              Quality Guarantee & Returns Policy
            </Link><br />
            <Link href="/terms" color="inherit" underline="hover">
              Terms & Conditions
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              MY ACCOUNT
            </Typography>
            <Link href="/my-account" color="inherit" underline="hover">
              My Information
            </Link><br />
            <Link href="/order-history" color="inherit" underline="hover">
              Order History
            </Link><br />
            <Link href="/notification-preferences" color="inherit" underline="hover">
              Notification Preferences
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom part of the footer with social media and copyright */}
      <Box 
        sx={{
          backgroundColor: '#16325B', // Lighter green for bottom part
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          // borderRadius: '40px',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%', // Ensure full width
          maxWidth: '100vw',
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: { xs: '10px', sm: '0' } }}>
          <Typography variant="body2">
            &copy; 2023 MilkSubz. All rights reserved.
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white' }}>
            <FaFacebook />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'white' }}>
            <FaTwitter />
          </IconButton>
          <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white' }}>
            <FaInstagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
