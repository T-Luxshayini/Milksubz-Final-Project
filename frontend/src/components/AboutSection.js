import React from 'react';
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Milk, UtensilsCrossed, CheckCircle } from 'lucide-react';
import image1 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/assets/images/7d68c363abe3d046e9371fb39044e001.jpg';
import image2 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/assets/images/03cb8bcbfbcd8a5389638ffe005de8fd.jpg';
import image3 from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/assets/images/vecteezy_realistic-photo-of-fresh-milk-close-up-food-photography_27812402.jpg';
import backgroundImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/assets/images/blue-bg.jpg'; // Import your background image

const AboutSection = () => {
  return (
    <Box
      // sx={{
      //   py: 8,
      //   bgcolor: '#f5f5f5',
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   // backgroundAttachment: 'fixed', // Optional for fixed background
      // }}
    >
      <Grid container spacing={4} maxWidth="lg" mx="auto" px={3}>
        <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', height: '100%' }}>
      {/* Main image */}
      <img
        src={image1}
        className="rounded-lg"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          flex: 1, // Ensures the image takes available height
          borderRadius: '20px'
        }}
        alt="Fresh Milk"
      />
      
      {/* Container for the two smaller images with flex display */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          mt: 2,
          flex: 1, // Ensures the container stretches
          borderRadius: '20px'
        }}
      >
        <img
          src={image2}
          alt="Milk delivery"
          className="rounded-lg"
          style={{
            width: '48%',
            height: '100%', // Stretch the image to fill container height
            objectFit: 'cover',
            borderRadius: '20px'
          }}
        />
        <img
          src={image3}
          alt="Health benefits of milk"
          className="rounded-lg"
          style={{
            width: '48%',
            height: '100%', // Stretch the image to fill container height
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </Box>
    </Box>

        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ color: '#78B7D0', mb: 1, }}>
            About us
          </Typography>
          <Typography variant="h4" sx={{ color: '#16325B', mb: 3, fontWeight: 'bold', }}>
            Fresh Dairy Delivered Daily
          </Typography>
          <Typography sx={{ color: '#16325B', mb: 4 }}>
            We bring the freshness of local dairy directly to your doorstep through our convenient subscription service. Our commitment to quality means every bottle of milk and dairy product comes from carefully selected local farms, ensuring you receive the freshest, most nutritious dairy products for your family.
          </Typography>
          {/* Features in tick format */}
<List sx={{ color: '#16325B', mb: 4 }}>
  {['High-Quality Dairy Products', 'Reliable Daily Delivery', 'Sustainable Farming Practices'].map((feature, index) => (
    <ListItem key={index} sx={{ alignItems: 'flex-start', pl: 0, display: 'flex', gap: 1 }}>
      <CheckCircle color="#78B7D0" size={20} /> {/* Tick Icon */}
      <ListItemText 
        primary={<Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#16325B' }}>{feature}</Typography>} 
        sx={{ m: 0 }} 
      />
    </ListItem>
  ))}
</List>



          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ bgcolor: '#78B7D0', color: 'white', height: '100%',borderRadius: '20px' }}>
                <CardContent>
                  <Milk size={32} />
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Daily Delivery
                  </Typography>
                  <Typography variant="body2">
                    Fresh milk and dairy products delivered to your door every morning, ensuring you start your day with farm-fresh nutrition.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ bgcolor: '#FFDC7F', color: '#16325B', height: '100%',borderRadius: '20px' }}>
                <CardContent>
                  <UtensilsCrossed size={32} />
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Product Range
                  </Typography>
                  <Typography variant="body2">
                    From fresh milk to yogurt, cheese, and cream - customize your subscription with our wide range of dairy products.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutSection;
