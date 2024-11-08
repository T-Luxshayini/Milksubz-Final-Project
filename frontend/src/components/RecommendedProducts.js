import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system'; // Import keyframes for the animation

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

const RecommendedProducts = ({ products }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewMore = () => {
    navigate('/products'); // Navigate to '/products' when called
  };

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
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
  );
};

export default RecommendedProducts;
