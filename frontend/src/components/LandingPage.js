import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { keyframes } from '@mui/system'; // Import keyframes for the animation
import SubscriptionModal from './SubscriptionModal';
import backgroundImage from '../../src/assets/images/milk_products_landscape_image.jpeg'; 
import product1Image from '../../src/assets/images/milk1.jpg';
import product1Image1 from '../../src/assets/images/paneer.jpeg';
import product1Image2 from '../../src/assets/images/ghee.jpeg';
import product1Image4 from '../../src/assets/images/choco milk.jpg';
import ContactUs from './ContactUs';
import CustomerFeedbacks from '../components/customerFeedback';
import AboutUs from './AboutUs';
import AboutSection from './AboutSection';

// Sample product data
const recommendedProducts = [
  { id: 1, name: 'Fresh Cow Milk', price: 'Rs200', image: product1Image },
  { id: 2, name: 'Paneer', price: 'Rs300', image: product1Image1 },
  { id: 3, name: 'Ghee', price: 'Rs280', image: product1Image2 },
  { id: 4, name: 'Choco milk', price: 'Rs120', image: product1Image4 }
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
        <Box sx={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                overflow: 'hidden',
            }}>
                {/* Background Image */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }} />

                {/* Content */}
                <Box sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    textAlign: 'center',
                    marginTop:{ xs:'-150px', md:'-250px' }, // Adjust for mobile
                }}>
                    <Typography variant="h2" component="h1" sx={{
                        fontWeight:'bold',
                        color:'#16325B',
                        mb:{ xs :2 , md :4 }, // Responsive margin
                        fontSize:{ xs:'2rem', md:'3rem' }, // Responsive font size
                    }}>
                        Welcome to MilkSubz
                    </Typography>
                    
                    <Typography variant="h6" sx={{
                        color:'#16325B',
                        fontSize:{ xs:'1rem', md:'1.5rem' }, // Responsive font size
                        fontWeight:'600',
                        lineHeight:'1.6',
                        mb:{ xs:'2rem', md:'4rem' }, // Responsive margin bottom
                        textTransform:'capitalize',
                        letterSpacing:'0.5px',
                        fontStyle:'italic',
                        textShadow:'2px 2px 4px rgba(0,0,0,.3)',
                    }}>
                        Delivering fresh milk and dairy products right to your doorstep
                    </Typography>

                    {/* Centered Buttons */}
                    <Box sx={{ display:'flex', flexDirection:{ xs:'column', sm:'row' }, gap:{ xs:'10px', sm:'20px' }, justifyContent:'center' }}>
                        <Button component={Link} to="/products" variant="contained" sx={{
                            backgroundColor:'#FFDC7F',
                            color:'#16325B',
                            padding:{ xs:'10px', md:'10px'}, // Responsive padding
                            borderRadius:'50px',
                            fontWeight:'bolder'
                        }}>
                            View Products
                        </Button>
                        <Button variant="contained" onClick={handleModalOpen} sx={{
                            backgroundColor:'#FFDC7F',
                            color:'#16325B',
                            fontWeight:'bold',
                            borderRadius:'50px'
                        }}>
                            Subscribe Now
                        </Button>

                        {/* Modal */}
                        <SubscriptionModal open={isModalOpen} onClose={handleModalClose} />
                    </Box>
                </Box>
            </Box>

            {/* Recommended Products Section */}
            <Container sx={{ py:{ xs :2 , md :8 } }}> {/* Adjusted padding for mobile view */}
                <Typography variant="h4" component="h2" sx={{ mb:{ xs :2 , md :4 }, textAlign:'center', color:'#16325B', fontWeight:'bold' }}>
                    Recommended Products
                </Typography>
                <Grid container spacing={4}> {/* Adjusted spacing for better mobile view */}
                    {recommendedProducts.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={3}>
                            <Card sx={{
                                maxWidth:{ xs :280 , md :350 }, // Responsive max width
                                width:'100%',
                                position:'relative',
                                padding:{ xs :2 , md :3 }, // Responsive padding
                                overflow:'hidden',
                                borderRadius :2,
                                transition:'transform .3s ease, box-shadow .3s ease',
                                '&:hover': {
                                    transform:'scale(1.05)',
                                    boxShadow:'0px 8px rgba(0,0,0,.3)',
                                },
                                border:`2px solid #0D7C66`,
                                animation:`${neonBorderAnimation} .5s infinite alternate`,
                            }}>
                                <CardMedia component="img" image={product.image} alt={product.name} sx={{
                                    width:'100%',
                                    height:{ xs :'150px' , md :'180px' }, // Responsive height
                                    objectFit:'cover',
                                    borderRadius :2,
                                    marginBottom :1,
                                }} />
                                
                                <CardContent sx={{ zIndex :2 }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight :'bold', whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" sx={{ fontSize :'1rem', color:'#78B7D0' }}>
                                        From {product.price}
                                    </Typography>
                                </CardContent>
                                
                                <CardActions sx={{ justifyContent :'center', zIndex :2 }}>
                                    <Button size="large" variant="contained" fullWidth sx={{
                                        backgroundColor:'#FFDC7F',
                                        padding :'8px', // Adjusted for mobile
                                        fontWeight :'bold',
                                        color:'#16325B',
                                        borderRadius :'50px'
                                    }} onClick={handleViewMore}>
                                        View More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Additional Sections */}
            <AboutSection />
            <AboutUs />
            <ContactUs />
            <CustomerFeedbacks />
        </Box>
    );
};

export default LandingPage;