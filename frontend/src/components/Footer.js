import React from 'react';
import { Box, Typography, Link, Grid, IconButton, Container } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        position: 'relative',
        backgroundColor: '#16325B',
        color: 'white',
        pt: 12, // Extra padding to account for the wave
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='%2316325B' fill-opacity='1' d='M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transform: 'translateY(-99%)'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and Description Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              MILKSUBZ
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.8 }}>
              Subscribe to your favorite dairy products with ease and convenience.
              Fresh milk delivered right to your doorstep.
            </Typography>
          </Grid>

          {/* Company Information Column */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              COMPANY
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>About Us</Link>
              <Link href="/environmental" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Environmental</Link>
              <Link href="/cookie-policy" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Cookie Policy</Link>
              <Link href="/privacy-policy" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Privacy Policy</Link>
              <Link href="/affiliate-program" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Affiliate Program</Link>
            </Box>
          </Grid>

          {/* Customer Services Column */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              CUSTOMER SERVICES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/contact" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Contact Us</Link>
              <Link href="/delivery-info" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Delivery Information</Link>
              <Link href="/returns-policy" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Quality Guarantee & Returns</Link>
              <Link href="/terms" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Terms & Conditions</Link>
            </Box>
          </Grid>

          {/* My Account Column */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              MY ACCOUNT
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/my-account" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>My Information</Link>
              <Link href="/order-history" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Order History</Link>
              <Link href="/notification-preferences" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Notification Preferences</Link>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box 
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            &copy; 2023 MilkSubz. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white', opacity: 0.8 }}>
              <FaFacebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'white', opacity: 0.8 }}>
              <FaTwitter />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white', opacity: 0.8 }}>
              <FaInstagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;