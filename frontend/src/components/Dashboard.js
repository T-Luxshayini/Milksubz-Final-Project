import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  h3 {
    margin: 10px 0 5px 0;
  }

  p {
    margin: 5px 0;
  }
`;

const StyledButton = styled(Button)`
  background-color: #007bff !important;
  color: white !important;
  margin: 5px;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
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

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setSnackbarMessage(`${product.name} added to cart successfully ✅`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBuyNow = (product) => {
    navigate('/payment', { state: { product } });
  };

  return (
    <div>
      <h2>Our Products</h2>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <img src={product.imageUrl} alt={product.name} width="200" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Rs {product.price}.00</p>
            <p>{product.category}</p>
            
            <div>
              <StyledButton variant="contained" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </StyledButton>
              {/* <StyledButton variant="contained" onClick={() => handleBuyNow(product)}>Buy Now</StyledButton> */}
            </div>
          </ProductCard>
        ))}
      </ProductGrid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1200}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
}

export default ProductList;