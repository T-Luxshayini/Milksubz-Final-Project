import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper
} from '@mui/material';

const SubscriptionShowcase = () => {
  const subscriptionFeatures = [
    {
      icon: "🥛",
      title: "Fresh Daily Delivery",
      description: "Get farm-fresh milk delivered to your doorstep every morning"
    },
    {
      icon: "📅",
      title: "Flexible Schedule",
      description: "Choose your delivery days and easily modify your schedule"
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Save more with our monthly subscription packages"
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description: "100% pure and quality-tested dairy products"
    }
  ];

  const stats = [
    { value: "5000+", label: "Active Subscribers" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "365", label: "Days of Service" },
    { value: "30+", label: "Products Available" }
  ];

  return (
    <Box sx={{ 
      py: 8,
      background: 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)'
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ 
            color: '#16325B',
            fontWeight: 'bold',
            mb: 2
          }}>
            Why Subscribe with Us?
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto'
          }}>
            Join thousands of happy customers who enjoy our premium milk subscription service
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {subscriptionFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
                border: '2px solid #0D7C66',
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    mb: 1,
                    color: '#16325B',
                    fontWeight: 'bold'
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Paper sx={{
          p: 6,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #16325B, #78B7D0)',
          color: 'white',
          borderRadius: 4,
          mb: 8
        }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Start Your Fresh Dairy Journey Today
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe now and get your first delivery free! Cancel anytime.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFDC7F',
                color: '#16325B',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFE39F'
                }
              }}
            >
              View Plans
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Paper>

        {/* Stats Section */}
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ 
                color: '#16325B',
                fontWeight: 'bold',
                mb: 1
              }}>
                {stat.value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SubscriptionShowcase;