import React, { useState } from 'react';

import { Link, useNavigate} from 'react-router-dom'; // Import useNavigate
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions, Paper, TextField } from '@mui/material';
import { keyframes } from '@mui/system'; // Import keyframes for the animation
import SubscriptionModal from './SubscriptionModal';
import backgroundImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milk_products_landscape_image.jpeg'; 
import product1Image from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milk1.jpg';
import product1Image1 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/paneer.jpeg';
import product1Image2 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/ghee.jpeg';

import product1Image4 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/choco milk.jpg';

import ContactUs from './ContactUs';
import CustomerFeedbacks from '../components/customerFeedback';
import AboutUs from './AboutUs';
import AboutSection from './AboutSection';
// import SubscriptionShowcase from './SubscriptionShowcase';
// import BlogSection from './BlogSection';
// Sample product data
const recommendedProducts = [
  { id: 1, name: 'Fresh Cow Milk', price: 'Rs200', image: product1Image },
  { id: 2, name: 'Paneer', price: 'Rs300', image: product1Image1 },
  { id: 3, name: 'Ghee', price: 'Rs280', image: product1Image2 },
  
  { id: 4, name: 'Choco Milk', price: 'Rs120', image: product1Image4 }
];

// Define the keyframes for the neon border animation
const neonBorderAnimation = keyframes`
  0% {
    border-color: #16325B;
    box-shadow: 0 0 5px #16325B, 0 0 10px #16325B, 0 0 15px #16325B;
  }
  50% {
    border-color: #16325B;
    box-shadow: 0 0 10px #16325B, 0 0 20px #16325B, 0 0 30px #16325B;
  }
  100% {
    border-color: #16325B;
    box-shadow: 0 0 5px #16325B, 0 0 10px #16325B, 0 0 15px #16325B;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
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
    width: '100vw', // Full viewport width
    height: '100vh', // Full viewport height
    display: 'flex', // Use flexbox to position content
    alignItems: 'flex-start', // Align content to the top
    justifyContent: 'flex-start', // Align content to the left side
    padding: 4, // Add padding if needed
    overflow: 'hidden', // Prevent any scrolling that might show white space
  }}
>
  {/* Background Image */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${backgroundImage})`, // Use your background image URL
      backgroundSize: 'cover', // Cover the entire viewport
      backgroundRepeat: 'no-repeat', // Prevent tiling
      backgroundPosition: 'left', // Position the background image to the left
      zIndex: -1, // Send it behind the content
    }}
  />

  {/* Content */}
  <Box
    sx={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', // Center content horizontally
      height: '100%',
      textAlign: 'center', // Center text horizontally
      marginTop: '-250px', // Adjust to move the content upwards or downwards as needed
    }}
  >
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontWeight: 'bold',
        color: '#16325B', // Updated text color
        mb: 2, // Add margin at the bottom
      }}
    >
      Welcome to MilkSubz
    </Typography>
    <Typography
  variant="h6"
  sx={{
    color: '#16325B', // Text color
    fontSize: '1.5rem', // Change font size
    fontWeight: '600', // Adjust font weight
    lineHeight: '1.6', // Adjust line height for better readability
    mb: 4, // Margin bottom
    textTransform: 'capitalize', // Capitalize the text if needed
    letterSpacing: '0.5px', // Adjust letter spacing
    fontStyle: 'italic', // Italicize the text
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add text shadow
  }}
>
  Delivering fresh milk and dairy products right to your doorstep
</Typography>


    {/* Centered Buttons */}
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Button
        component={Link}
        to="/products"
        variant="contained"
        sx={{
          backgroundColor: '#FFDC7F',
          color: '#16325B',
          padding: '10px 20px',
          borderRadius: '50px',
          fontWeight: 'bolder',
          
        }}
      >
        View Products
      </Button>
      <Button
        variant="contained"
        onClick={handleModalOpen}
        sx={{ backgroundColor: '#FFDC7F', color: '#16325B', fontWeight: 'bold' }}
      >
        Subscribe Now
      </Button>

      {/* Modal */}
      <SubscriptionModal open={isModalOpen} onClose={handleModalClose} />
    </Box>
  </Box>
</Box>




      {/* Recommended Products Section */}
      <Container sx={{ py: 8 }}>
  <Typography
    variant="h4"
    component="h2"
    sx={{ mb: 4, textAlign: 'center', color: '#16325B', fontWeight: 'bold' }}
  >
    Recommended Products
  </Typography>
  <Grid container spacing={8}> {/* Increased spacing from 6 to 8 */}
    {recommendedProducts.map((product) => (
      <Grid item key={product.id} xs={12} sm={6} md={3}>
        <Card
          sx={{
            maxWidth: 350,
            width: '100%', // Use full width of the Grid item
            position: 'relative',
            padding: 2,
            overflow: 'hidden',
            borderRadius: 2,
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
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: 2,
              marginBottom: 1,
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
              sx={{ fontSize: '1.2rem', color: '#78B7D0' }}
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
                backgroundColor: '#FFDC7F',
                padding: '8px 16px',
                fontWeight: 'bold',
                color: '#16325B',
                borderRadius: '50px',
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

{/* <SubscriptionShowcase/> */}
      {/* <CustomerFeedbacks/> */}
      <AboutSection/>
      <AboutUs/>
      {/* <BlogSection/> */}
      <ContactUs/>
      <CustomerFeedbacks/>

      {/* About Us Section */}
      {/* <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#0D7C66', fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          Welcome to MilkSubz! We deliver fresh, high-quality milk and dairy products right to your door.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          Our goal is to make it easy for families in Sri Lanka to enjoy fresh dairy without the hassle of going to the store. From milk and curd to ghee and milk toffees, we bring you the best local products on a convenient subscription basis.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          <strong>Fresh & Local:</strong> We work with local farms to bring you quality dairy products.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          <strong>Easy Subscriptions:</strong> Choose a plan, and we’ll handle the rest. Pause or cancel anytime.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          <strong>Friendly Service:</strong> We’re here to make sure you have the best experience possible.
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Thank you for choosing MilkSubz. We’re excited to be a part of your daily routine!
        </Typography>
      </Container> */}

      {/* Contact Us Section
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
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#0D7C66',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                }}
              >
                Send Message
              </Button>
            </form>
          </Box>
        </Paper>
      </Container> */}
    </Box>
  );
};

export default LandingPage;
