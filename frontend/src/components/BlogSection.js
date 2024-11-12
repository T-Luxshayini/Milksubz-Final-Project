import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const BlogSection = () => {
  const blogs = [
    {
      title: 'The Benefits of Fresh Milk',
      date: 'November 10, 2024',
      description: 'Discover the health benefits of fresh milk and why it should be a staple in your diet.',
      image: 'https://pbs.twimg.com/media/DBNfBWjUQAA6SVH.jpg', // Replace with your image URL
    },
    {
      title: 'How to Choose Quality Dairy Products',
      date: 'October 25, 2024',
      description: 'Learn tips for selecting the best quality dairy products for your family.',
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Dairy in Your Daily Diet',
      date: 'October 10, 2024',
      description: 'Explore the role of dairy in a balanced diet and its nutritional benefits.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <Box sx={{ padding: { xs: '20px', sm: '30px', md: '40px' }, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#16325B',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '20px',
        }}
      >
        Our Blog
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                component="img"
                height="140"
                image={blog.image}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#16325B' }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '10px' }}>
                  {blog.date}
                </Typography>
                <Typography variant="body2" sx={{ color: '#16325B' }}>
                  {blog.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: '10px' }}
                href="#"
              >
                Read More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogSection;
