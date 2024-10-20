import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { Card, CardContent, CardMedia, Typography, Button as MuiButton } from '@mui/material';

const PageWrapper = styled.div`
  background-image: url('/path/to/your/background-image.jpg'); /* Ensure this path is correct */
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
  color: #0D7C66; /* Matching your brand color */
  margin-bottom: 40px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive grid */
  gap: 40px; /* Increase the gap between products */
  justify-content: center; /* Center the grid */
  max-width: 1200px; /* Max width of grid */
  margin: 0 auto;
`;

const ProductCard = styled(Card)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 4px solid #0D7C66; /* Add a border color */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 8px; /* Rounded corners */
  overflow: hidden; /* Prevents overflow */
  &:hover {
    transform: translateY(-5px); /* Subtle lift effect */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const HoverButton = styled(MuiButton)`
  font-size: 0.875rem; /* Slightly larger font size */
  padding: 10px 20px; /* Adjust padding */
  margin: 5px; /* Adjust margin */
  transition: all 0.3s ease;
  background-color: #0D7C66; /* Set green button background color */
  color: white; /* Button text color */
  border: 2px solid transparent; /* Initial border */
  
  /* Neon border effect */
  box-shadow: 0 0 5px rgba(13, 124, 102, 0.8), 
              0 0 10px rgba(13, 124, 102, 0.6), 
              0 0 15px rgba(13, 124, 102, 0.4);
  
  &:hover {
    background-color: #66BB6A; /* Lighter green on hover */
    box-shadow: 0 0 10px rgba(13, 124, 102, 1), 
                0 0 20px rgba(13, 124, 102, 0.8), 
                0 0 30px rgba(13, 124, 102, 0.6); /* Brighter neon effect on hover */
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // 6 products per page
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    navigate('/payment', { state: { product } });
  };

  const handleSubscribe = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSubscriptionChoice = (plan) => {
    if (plan === '1 Month') {
      // Redirect to the PayHere payment link
      window.location.href = 'https://sandbox.payhere.lk/pay/ob0121425';
    } else {
      alert(`Subscribed to ${plan} for ${selectedProduct.name}`);
    }
    setShowModal(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <PageWrapper>
      <Title>Our Products</Title>
      <ProductGrid>
        {currentProducts.map((product) => (
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
              <Typography variant="body1" color="#41B3A2">
                Rs {product.price}.00
              </Typography>
              <Typography variant="body2">
                {product.category}
              </Typography>
              <HoverButton variant="contained" color='' onClick={() => handleAddToCart(product)}>
                Add to Cart
              </HoverButton>
              <HoverButton variant="contained" color="success" onClick={() => handleSubscribe(product)}>
                Subscribe
              </HoverButton>
            </CardContent>
          </ProductCard>
        ))}
      </ProductGrid>

      {/* Pagination component */}
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />

      {/* Modal for subscription selection */}
      {showModal && (
        <ModalWrapper onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Choose Subscription Plan for {selectedProduct?.name}</h3>
            <HoverButton onClick={() => handleSubscriptionChoice('1 Week')}>1 Week</HoverButton>
            <HoverButton onClick={() => handleSubscriptionChoice('1 Month')}>1 Month</HoverButton>
            <HoverButton onClick={() => setShowModal(false)}>Cancel</HoverButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </PageWrapper>
  );
}

export default ProductList;
