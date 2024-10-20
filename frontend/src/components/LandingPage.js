import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions, Paper, TextField } from '@mui/material';
import { keyframes } from '@mui/system'; // Import keyframes for the animation

import backgroundImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/vecteezy_ai-generated-bottle-of-milk-and-basket-of-daisies_41323560.jpeg'; 
import product1Image from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milk1.jpg';
import product1Image1 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/paneer.jpeg';
import product1Image2 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/ghee.jpeg';
import vectorImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/5114855.jpg';

// Sample product data
const recommendedProducts = [
  { id: 1, name: 'Fresh Cow Milk', price: 'Rs200', image: product1Image },
  { id: 2, name: 'Paneer', price: 'Rs300', image: product1Image1 },
  { id: 3, name: 'Ghee', price: 'Rs280', image: product1Image2 },
];

// Define the keyframes for the neon border animation
const neonBorderAnimation = keyframes`
  0% {
    border-color: #0D7C66;
    box-shadow: 0 0 5px #0D7C66, 0 0 10px #0D7C66, 0 0 15px #0D7C66;
  }
  50% {
    border-color: #41B3A2;
    box-shadow: 0 0 10px #41B3A2, 0 0 20px #41B3A2, 0 0 30px #41B3A2;
  }
  100% {
    border-color: #0D7C66;
    box-shadow: 0 0 5px #0D7C66, 0 0 10px #0D7C66, 0 0 15px #0D7C66;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewMore = () => {
    navigate('/products'); // Navigate to '/products' when called
  };

  return (
    <Box
      sx={{
        overflowX: 'hidden', // Hide horizontal overflow
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh', // Adjust height as needed
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '50px',
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          Welcome to MilkSubz
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
          Delivering fresh milk and dairy products right to your doorstep
        </Typography>

        {/* CTA Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            sx={{ backgroundColor: '#fff', color: '#0D7C66', padding: '15px 30px', fontSize: '1em', fontWeight: 'bold', borderRadius: '5px' }}
          >
            View Products
          </Button>
          <Button
            component={Link}
            to="/subscriptions"
            variant="contained"
            sx={{ backgroundColor: '#0D7C66', padding: '15px 30px', fontSize: '1em', fontWeight: 'bold', borderRadius: '5px' }}
          >
            Subscribe Now
          </Button>
        </Box>
      </Box>

      {/* Recommended Products Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center', color: '#0D7C66', fontWeight: 'bold' }}>
          Recommended Products
        </Typography>
        <Grid container spacing={3}>
  {recommendedProducts.map((product) => (
    <Grid item key={product.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          maxWidth: 300,
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          },
          border: '2px solid #0D7C66',
          animation: `${neonBorderAnimation} 1.5s infinite alternate`,
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: '100%',        // Ensures all images have the same width
            height: '200px',      // Set a fixed height to keep image sizes consistent
            objectFit: 'cover',   // Crop and fit the image while maintaining aspect ratio
          }}
        />
        <CardContent sx={{ zIndex: 2 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: '1.2rem', color: '#41B3A2' }}
          >
            From {product.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', zIndex: 2 }}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#0D7C66',
              padding: '10px 20px',
              fontWeight: 'bold',
            }}
            onClick={handleViewMore}
          >
            View More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>

      </Container>

      {/* Contact Us Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: '#0D7C66',
            fontWeight: 'bold',
          }}
        >
          Contact Us
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: '800px',
            margin: '0 auto',
            backgroundcolor: '#0D7C66',
            color: '#0D7C66',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={vectorImage}
            alt="Contact Us Illustration"
            sx={{
              width: { xs: '100%', md: '50%' },
              maxHeight: '300px',
              objectFit: 'contain',
              marginRight: { md: 3 },
              mb: { xs: 3, md: 0 },
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Get in Touch
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#0D7C66',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0D7C66',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0D7C66',
                    },
                  },
                  '& .MuiInputLabel-outlined': {
                    color: '#0D7C66',
                  },
                }}
                InputProps={{
                  style: { color: '#0D7C66' },
                }}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#0D7C66',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0D7C66',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0D7C66',
                    },
                  },
                  '& .MuiInputLabel-outlined': {
                    color: '#0D7C66',
                  },
                }}
                InputProps={{
                  style: { color: '#0D7C66' },
                }}
              />
              <TextField
                fullWidth
                label="Your Message"
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#0D7C66',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0D7C66',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0D7C66',
                    },
                  },
                  '& .MuiInputLabel-outlined': {
                    color: '#0D7C66',
                  },
                }}
                InputProps={{
                  style: { color: '#0D7C66' },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#0D7C66', padding: '10px 20px' }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>

      {/* Footer Section */}
      
    </Box>
  );
};

export default LandingPage;
