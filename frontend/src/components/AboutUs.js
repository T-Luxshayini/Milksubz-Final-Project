import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LocalDrinkOutlined, FeedOutlined, ShieldOutlined } from '@mui/icons-material';
import video from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/Blue and White Milk Product Promo Video .mp4';

const AboutUs = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: '20px', sm: '30px', md: '40px' },
        minHeight: '70vh',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: '#16325B',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', // Center content horizontally
        marginTop: '30px'
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.9,
        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Title Section */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: '#16325B',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          marginLeft: '-80px',
        }}
      >
        WHY MilkSubz?
      </Typography>

      {/* Icon Section */}
      <Grid
  container
  spacing={2} // Uniform gap between all cards
  justifyContent="center"  // Center the items horizontally
  sx={{ marginTop: '40px' }}
>
  {/* Icon 1: Fresh Milk */}
  <Grid item xs={12} sm={4} md={3} textAlign="center">
    <Card
      sx={{
        width: '100%', // Fixed width for consistent card size
        maxWidth: 300, // Increased maxWidth for bigger cards
        height: 350, // Set height for a larger card
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(22, 50, 91, 0.8)', // Added transparency (70%)
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
          height: '100%', // Ensure the content fills the card
          textAlign: 'center', // Ensure text is centered
        }}
      >
        <LocalDrinkOutlined sx={{ fontSize: 80, color: '#fff' }} />
        <Typography
          variant="h5" // Increased font size for the title
          gutterBottom
          sx={{
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Fresh Milk
        </Typography>
        <Typography
          variant="body1" // Increased font size for the body text
          sx={{
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Enjoy the freshest, purest milk delivered straight to your doorstep.
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  {/* Icon 2: Wide Variety */}
  <Grid item xs={12} sm={4} md={3} textAlign="center">
    <Card
      sx={{
        width: '100%', // Fixed width for consistent card size
        maxWidth: 300, // Increased maxWidth for bigger cards
        height: 350, // Set height for a larger card
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(22, 50, 91, 0.8)', // Added transparency (70%)
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
          height: '100%', // Ensure the content fills the card
          textAlign: 'center', // Ensure text is centered
        }}
      >
        <FeedOutlined sx={{ fontSize: 80, color: '#fff' }} />
        <Typography
          variant="h5" // Increased font size for the title
          gutterBottom
          sx={{
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Wide Variety
        </Typography>
        <Typography
          variant="body1" // Increased font size for the body text
          sx={{
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          From milk to paneer, curd, ghee, kulfi, and more, we have it all.
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  {/* Icon 3: Quality Assured */}
  <Grid item xs={12} sm={4} md={3} textAlign="center">
    <Card
      sx={{
        width: '100%', // Fixed width for consistent card size
        maxWidth: 300, // Increased maxWidth for bigger cards
        height: 350, // Set height for a larger card
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(22, 50, 91, 0.8)', // Added transparency (70%)
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
          height: '100%', // Ensure the content fills the card
          textAlign: 'center', // Ensure text is centered
        }}
      >
        <ShieldOutlined sx={{ fontSize: 80, color: '#fff' }} />
        <Typography
          variant="h5" // Increased font size for the title
          gutterBottom
          sx={{
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Quality Assured
        </Typography>
        <Typography
          variant="body1" // Increased font size for the body text
          sx={{
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Stringent quality standards ensure the best dairy products for you.
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>


    </Box>
  );
};

export default AboutUs;
