import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pagination, Snackbar, Alert } from '@mui/material';
import { Card, CardContent, CardMedia, Typography, Button as MuiButton } from '@mui/material';

const PageWrapper = styled.div`
  background-image: url('/path/to/your/background-image.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
  color: #16325B;
  margin-bottom: 40px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled(Card)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 4px solid #16325B;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const HoverButton = styled(MuiButton)`
  && {
    font-size: 0.875rem;
    padding: 10px 20px;
    margin: 5px;
    background-color: #FFDC7F;
    color: #16325B;
    border: 2px solid transparent;
    border-radius: 50px;
                
    &:hover {
      background-color: #FFDC7F;
    }
  }
`;

const SubscribeButton = styled(MuiButton)`
  && {
    font-size: 0.875rem;
    padding: 10px 20px;
    margin: 5px;
    background-color: #16325B;
    color: #FFDC7F;
    border: 2px solid transparent;
    border-radius: 50px;
                
    &:hover {
      background-color: #16325B;
    }
  }
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setNotification({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
  };

  const handleSubscribe = (product) => {
    navigate('/sub', { state: { product } });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <PageWrapper>
      <Title>Our Products</Title>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: '80px' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>

      <ProductGrid>
        {currentProducts.map((product, index) => (
          <ProductCard key={product._id} sx={{ maxWidth: 300, textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="180"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1" color="#78B7D0">
                LKR {product.price}
              </Typography>
              <Typography variant="body2">
                {product.category}
              </Typography>
              <HoverButton 
                variant="contained" 
                disableElevation
                disableRipple
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </HoverButton>
              {index === 0 && (
                <SubscribeButton 
                  variant="contained"
                  disableElevation
                  disableRipple
                  onClick={() => handleSubscribe(product)}
                >
                  Subscribe
                </SubscribeButton>
              )}
            </CardContent>
          </ProductCard>
        ))}
      </ProductGrid>

      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </PageWrapper>
  );
}

export default ProductList;