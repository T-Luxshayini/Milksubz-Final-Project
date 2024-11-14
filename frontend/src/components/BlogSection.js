import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Pagination,
  Box,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { ArrowRight } from 'lucide-react';

// Sample blog data about milk and dairy
const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Different Types of Milk",
    category: "Dairy Education",
    date: "November 10, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "From whole milk to skim milk, discover the nutritional differences and best uses for each type of dairy milk. Learn about fat content, calcium levels, and how processing affects milk's nutritional value...",
    link: "/blog/milk-types",
    content: `
      Different types of milk offer varying nutritional benefits:
      - Whole milk (3.25% fat): Rich and creamy, ideal for baking
      - Reduced-fat milk (2%): Balance of nutrition and lower calories
      - Low-fat milk (1%): Lower in calories while maintaining calcium
      - Skim milk (0%): Lowest in calories, highest in protein per calorie
      
      Each type serves different dietary needs and cooking purposes. Whole milk provides essential nutrients for growing children, while skim milk suits those watching their calorie intake.
    `
  },
  {
    id: 2,
    title: "Artisanal Cheese Making: From Tradition to Table",
    category: "Cheese Craft",
    date: "November 8, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "Explore the ancient art of cheese making, from selecting the perfect milk to aging techniques. Learn how artisanal cheese makers create their signature flavors...",
    link: "/blog/cheese-making",
    content: `
      The art of cheese making involves several crucial steps:
      1. Milk selection and preparation
      2. Culture addition and rennet
      3. Curd formation and cutting
      4. Draining and shaping
      5. Aging and affinage
      
      Each step requires precise timing and conditions to develop the desired flavors and textures. Traditional methods passed down through generations continue to influence modern cheese making.
    `
  },
  {
    id: 3,
    title: "The Rise of Premium Yogurt Culture",
    category: "Dairy Trends",
    date: "November 6, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "Why premium yogurt brands are taking over dairy aisles and how they're revolutionizing breakfast culture. Discover the health benefits and culinary applications...",
    link: "/blog/premium-yogurt",
    content: `
      Premium yogurt has transformed the dairy aisle with:
      - Enhanced probiotic cultures
      - Grass-fed milk sourcing
      - Creative flavor combinations
      - Artisanal production methods
      
      This movement reflects consumers' growing interest in high-quality dairy products and their health benefits. Artisanal yogurt makers are pushing boundaries with innovative flavors and textures.
    `
  },
  {
    id: 4,
    title: "Butter: The Ultimate Guide to Cultured vs Sweet Cream",
    category: "Butter Basics",
    date: "November 4, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "Understanding the difference between cultured and sweet cream butter, their uses in cooking, and how to make your own at home...",
    link: "/blog/butter-guide",
    content: `
      Butter varieties explained:
      
      Sweet Cream Butter:
      - Made from fresh pasteurized cream
      - Mild, pure butter flavor
      - Perfect for baking and general use
      
      Cultured Butter:
      - Cream is fermented before churning
      - Complex, tangy flavor
      - Higher butterfat content
      - Preferred for artisanal baking
    `
  },
  {
    id: 5,
    title: "Ice Cream Innovation: Small-Batch Revolution",
    category: "Frozen Dairy",
    date: "November 2, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "How small-batch ice cream makers are changing the frozen dairy landscape with innovative flavors and premium ingredients...",
    link: "/blog/ice-cream-innovation",
    content: `
      The small-batch ice cream movement features:
      - Local milk and cream sourcing
      - Seasonal ingredient incorporation
      - Unique flavor combinations
      - Artisanal production methods
      - Sustainable packaging
      
      These craftspeople are redefining premium ice cream through quality ingredients and creative flavor profiles.
    `
  },
  {
    id: 6,
    title: "The Science of Milk: From Cow to Container",
    category: "Dairy Science",
    date: "October 31, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "A deep dive into the journey of milk from farm to table, including processing, pasteurization, and packaging technologies...",
    link: "/blog/milk-science",
    content: `
      Modern milk processing involves:
      1. Collection and testing
      2. Clarification and separation
      3. Pasteurization methods
      4. Homogenization
      5. Packaging and distribution
      
      Each step ensures safety while maintaining nutritional value and taste.
    `
  },
  {
    id: 7,
    title: "Sustainability in Dairy Farming",
    category: "Dairy Industry",
    date: "October 29, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "Exploring innovative practices in sustainable dairy farming and how farmers are reducing their environmental impact...",
    link: "/blog/sustainable-dairy",
    content: `
      Sustainable dairy practices include:
      - Methane capture and reuse
      - Water conservation systems
      - Regenerative grazing practices
      - Solar power integration
      - Waste management innovation
      
      These practices help reduce environmental impact while maintaining production quality.
    `
  },
  {
    id: 8,
    title: "Global Dairy Traditions: A Cultural Journey",
    category: "Dairy Culture",
    date: "October 27, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "Discover how different cultures around the world incorporate dairy into their traditional foods and daily life...",
    link: "/blog/dairy-traditions",
    content: `
      Explore dairy traditions worldwide:
      - Indian paneer and lassi
      - French cheese aging techniques
      - Mongolian fermented mare's milk
      - Scandinavian cultured dairy products
      - Middle Eastern labneh
      
      Each culture has developed unique ways to preserve and enjoy dairy products.
    `
  },
  {
    id: 9,
    title: "Dairy Alternatives: Understanding Your Options",
    category: "Alternative Dairy",
    date: "October 25, 2024",
    image: "/api/placeholder/400/250",
    excerpt: "A comprehensive guide to dairy alternatives, their nutritional profiles, and best uses in cooking and baking...",
    link: "/blog/dairy-alternatives",
    content: `
      Popular dairy alternatives include:
      - Almond milk: Low calories, good for smoothies
      - Soy milk: High protein, versatile
      - Oat milk: Creamy texture, great for coffee
      - Coconut milk: Rich in healthy fats
      - Cashew milk: Smooth texture, good for sauces
      
      Each alternative offers unique benefits and cooking properties.
    `
  }
];

// Custom theme with dairy-inspired colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3d59', // Deep blue
    },
    secondary: {
      main: '#f5f0e1', // Cream color
    },
    background: {
      default: '#fff5f5', // Light cream background
    },
  },
});

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const getCurrentPosts = () => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return blogPosts.slice(startIndex, endIndex);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" align="center" gutterBottom
            sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main' }}>
            The Dairy Digest
          </Typography>
          
          <Typography variant="h6" align="center" sx={{ mb: 8, color: 'text.secondary' }}>
            Exploring the World of Milk and Dairy Products
          </Typography>
          
          <Grid container spacing={4}>
            {getCurrentPosts().map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" color="primary">
                      {post.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {post.date}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {post.excerpt}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      endIcon={<ArrowRight size={16} />}
                      href={post.link}
                      sx={{ 
                        mt: 2,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1.1rem',
                }
              }}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
);
};

export default BlogPage;